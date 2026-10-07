<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\NaamController;
use App\Http\Controllers\Api\V1\SessionController;
use App\Http\Controllers\Api\V1\NaamEntryController;
use App\Http\Controllers\Api\V1\SyncController;
use App\Http\Controllers\Api\V1\HistoryController;
use App\Http\Controllers\Api\V1\DeviceController;

/*
|--------------------------------------------------------------------------
| API Routes — Version 1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Naams
    Route::get('/naams', [NaamController::class, 'index']);

    // Sessions
    Route::post('/sessions', [SessionController::class, 'store']);
    Route::get('/sessions/{session_uuid}', [SessionController::class, 'show']);

    // Entries & Synchronization
    Route::post('/sessions/{session_uuid}/entries', [NaamEntryController::class, 'store']);
    Route::post('/sessions/{session_uuid}/sync', [SyncController::class, 'sync']);

    // History & Devices & Dashboard
    Route::get('/history', [HistoryController::class, 'index']);
    Route::get('/dashboard/stats', [HistoryController::class, 'stats']);
    Route::post('/devices/register', [DeviceController::class, 'register']);
    Route::get('/devices/{device_uuid}', [DeviceController::class, 'show']);
});
