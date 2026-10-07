<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNaamEntryRequest;
use App\Models\Session;
use App\Services\NaamEntryService;
use Illuminate\Http\JsonResponse;

class NaamEntryController extends Controller
{
    public function __construct(
        protected NaamEntryService $naamEntryService
    ) {}

    /**
     * Record a written Naam entry
     */
    public function store(StoreNaamEntryRequest $request, string $sessionUuid): JsonResponse
    {
        $session = Session::where('session_uuid', $sessionUuid)->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Session not found.',
            ], 404);
        }

        $result = $this->naamEntryService->recordEntry($session, $request->validated());

        return response()->json([
            'success' => true,
            'data' => [
                'entry' => $result['entry'],
                'is_duplicate' => $result['is_duplicate'],
                'session' => $result['session'],
            ],
            'message' => $result['is_duplicate']
                ? 'Entry already recorded (idempotent no-op).'
                : 'Naam entry saved successfully.',
        ], $result['is_duplicate'] ? 200 : 201);
    }
}
