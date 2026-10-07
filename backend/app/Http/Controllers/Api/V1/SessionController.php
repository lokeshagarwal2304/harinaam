<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSessionRequest;
use App\Services\SessionService;
use Illuminate\Http\JsonResponse;

class SessionController extends Controller
{
    public function __construct(
        protected SessionService $sessionService
    ) {}

    /**
     * Create a new session
     */
    public function store(CreateSessionRequest $request): JsonResponse
    {
        $session = $this->sessionService->createSession($request->validated());

        return response()->json([
            'success' => true,
            'data' => $session,
            'message' => 'Session created successfully.',
        ], 201);
    }

    /**
     * Show session progression
     */
    public function show(string $sessionUuid): JsonResponse
    {
        $session = $this->sessionService->getSessionDetails($sessionUuid);

        if (!$session) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Session not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $session,
            'message' => 'Session retrieved successfully.',
        ]);
    }
}
