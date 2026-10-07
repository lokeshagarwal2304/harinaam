<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'app' => 'Harinaam API Server',
        'status' => 'operational',
        'version' => '1.0.0',
        'timestamp' => now()->toISOString(),
    ]);
});
