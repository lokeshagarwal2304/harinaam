<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HistoryController extends Controller
{
    /**
     * Get practice session history
     */
    public function index(Request $request): JsonResponse
    {
        $deviceUuid = $request->query('device_uuid');
        $devoteeName = $request->query('devotee_name');
        $query = Session::with(['naam', 'malas'])->latest('started_at');

        if ($deviceUuid) {
            $device = Device::where('device_uuid', $deviceUuid)->first();
            if ($device) {
                $query->where('device_id', $device->id);
            }
        }

        if ($devoteeName) {
            $query->where('devotee_name', 'like', "%{$devoteeName}%");
        }

        $sessions = $query->paginate(30);

        return response()->json([
            'success' => true,
            'data' => $sessions,
            'message' => 'Practice history retrieved successfully.',
        ]);
    }

    /**
     * Get aggregated sadhana dashboard statistics
     */
    public function stats(Request $request): JsonResponse
    {
        $devoteeName = $request->query('devotee_name');
        $query = Session::query();

        if ($devoteeName) {
            $query->where('devotee_name', 'like', "%{$devoteeName}%");
        }

        $totalSessions = (clone $query)->count();
        $completedSessions = (clone $query)->where('status', 'completed')->count();
        $totalMalas = (clone $query)->sum('completed_malas');
        $totalEntries = (clone $query)->sum('completed_entries');
        $totalSeconds = (clone $query)->sum('duration_seconds');

        // Breakdown by Naam
        $naamBreakdown = (clone $query)
            ->join('naams', 'sessions.naam_id', '=', 'naams.id')
            ->selectRaw('naams.name, naams.display_name, sum(sessions.completed_entries) as total_entries, sum(sessions.completed_malas) as total_malas, count(sessions.id) as total_sessions')
            ->groupBy('naams.name', 'naams.display_name')
            ->get();

        // Recent unique devotees
        $devotees = Session::whereNotNull('devotee_name')
            ->where('devotee_name', '!=', '')
            ->selectRaw('devotee_name, count(id) as sessions_count, sum(completed_entries) as total_entries, sum(completed_malas) as total_malas, max(started_at) as last_active')
            ->groupBy('devotee_name')
            ->orderByDesc('total_entries')
            ->take(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_sessions' => $totalSessions,
                'completed_sessions' => $completedSessions,
                'total_malas' => (int) $totalMalas,
                'total_entries' => (int) $totalEntries,
                'total_minutes' => round($totalSeconds / 60, 1),
                'naam_breakdown' => $naamBreakdown,
                'devotees' => $devotees,
            ],
            'message' => 'Sadhana dashboard stats retrieved successfully.',
        ]);
    }
}
