<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Naam;
use Illuminate\Http\JsonResponse;

class NaamController extends Controller
{
    /**
     * Return list of active holy Naams
     */
    public function index(): JsonResponse
    {
        $naams = Naam::active()->get();

        return response()->json([
            'success' => true,
            'data' => $naams,
            'message' => 'Active Naams retrieved successfully.',
        ]);
    }
}
