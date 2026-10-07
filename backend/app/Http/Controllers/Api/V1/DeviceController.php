<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DeviceController extends Controller
{
    /**
     * Register or update device metadata
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'device_uuid' => 'required|uuid',
            'device_type' => 'nullable|in:web,mobile,tablet,eink_device',
            'device_name' => 'nullable|string|max:255',
            'platform' => 'nullable|string|max:100',
        ]);

        $device = Device::updateOrCreate(
            ['device_uuid' => $validated['device_uuid']],
            [
                'device_type' => $validated['device_type'] ?? 'web',
                'device_name' => $validated['device_name'] ?? null,
                'platform' => $validated['platform'] ?? null,
                'user_agent' => $request->userAgent(),
                'last_seen_at' => now(),
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $device,
            'message' => 'Device registered successfully.',
        ]);
    }

    /**
     * Get device information by UUID
     */
    public function show(string $deviceUuid): JsonResponse
    {
        $device = Device::where('device_uuid', $deviceUuid)->first();

        if (!$device) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Device not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $device,
            'message' => 'Device retrieved successfully.',
        ]);
    }
}
