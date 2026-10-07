<?php

namespace App\Services;

use App\Models\Session;
use App\Models\Mala;
use App\Models\Device;
use Illuminate\Support\Facades\DB;

class SessionService
{
    /**
     * Initialize a new writing session with Malas
     */
    public function createSession(array $data): Session
    {
        return DB::transaction(function () use ($data) {
            $deviceId = null;
            if (!empty($data['device_uuid'])) {
                $device = Device::firstOrCreate(
                    ['device_uuid' => $data['device_uuid']],
                    [
                        'device_type' => $data['device_type'] ?? 'web',
                        'last_seen_at' => now(),
                    ]
                );
                $deviceId = $device->id;
            }

            $userId = $data['user_id'] ?? null;
            $devoteeName = $data['devotee_name'] ?? $data['user_name'] ?? null;
            if (!$userId && !empty($devoteeName)) {
                $user = \App\Models\User::firstOrCreate(
                    ['name' => $devoteeName],
                    ['email' => null]
                );
                $userId = $user->id;
            }

            $targetMalas = (int) ($data['target_malas'] ?? 1);
            $targetEntries = $targetMalas * 108;

            $session = Session::create([
                'session_uuid' => $data['session_uuid'],
                'user_id' => $userId,
                'device_id' => $deviceId,
                'devotee_name' => $devoteeName,
                'naam_id' => $data['naam_id'],
                'target_malas' => $targetMalas,
                'completed_malas' => 0,
                'target_entries' => $targetEntries,
                'completed_entries' => 0,
                'status' => 'in_progress',
                'started_at' => now(),
            ]);

            // Create Mala records
            for ($i = 1; $i <= $targetMalas; $i++) {
                Mala::create([
                    'session_id' => $session->id,
                    'mala_number' => $i,
                    'target_entries' => 108,
                    'completed_entries' => 0,
                    'status' => $i === 1 ? 'in_progress' : 'pending',
                    'started_at' => $i === 1 ? now() : null,
                ]);
            }

            return $session->load(['naam', 'malas']);
        });
    }

    /**
     * Get session details with real-time progression
     */
    public function getSessionDetails(string $sessionUuid): ?Session
    {
        return Session::with(['naam', 'malas'])->where('session_uuid', $sessionUuid)->first();
    }
}
