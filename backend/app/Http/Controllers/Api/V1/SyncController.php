<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchSyncRequest;
use App\Models\Session;
use App\Services\SyncService;
use Illuminate\Http\JsonResponse;

class SyncController extends Controller
{
    public function __construct(
        protected SyncService $syncService
    ) {}

    /**
     * Bulk sync offline entries
     */
    public function sync(BatchSyncRequest $request, string $sessionUuid): JsonResponse
    {
        $session = Session::where('session_uuid', $sessionUuid)->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Session not found.',
            ], 404);
        }

        $result = $this->syncService->processBatchSync($session, $request->validated('entries'));

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => 'Batch synchronization completed successfully.',
        ]);
    }
}
