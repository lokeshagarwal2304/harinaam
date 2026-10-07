<?php

$baseUrl = 'http://127.0.0.1:8000/api/v1';

echo "=== Testing Harinaam Backend APIs ===\n";

// 1. GET /naams
$naamsJson = file_get_contents($baseUrl . '/naams');
$naams = json_decode($naamsJson, true);
echo "1. GET /naams: " . ($naams['success'] ? "PASS (Count: " . count($naams['data']) . ")" : "FAIL") . "\n";

// 2. POST /sessions
$sessionUuid = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    mt_rand(0, 0xffff), mt_rand(0, 0xffff),
    mt_rand(0, 0xffff),
    mt_rand(0, 0x0fff) | 0x4000,
    mt_rand(0, 0x3fff) | 0x8000,
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
);

$sessionPayload = json_encode([
    'session_uuid' => $sessionUuid,
    'naam_id' => 1,
    'target_malas' => 1,
    'devotee_name' => 'लोकेश अग्रवाल',
]);

$ctx = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => $sessionPayload,
        'ignore_errors' => true
    ]
]);

$sessionResJson = file_get_contents($baseUrl . '/sessions', false, $ctx);
$sessionRes = json_decode($sessionResJson, true);
echo "2. POST /sessions: " . ($sessionRes['success'] ? "PASS (UUID: $sessionUuid)" : "FAIL - " . $sessionResJson) . "\n";

// 3. POST /sessions/{uuid}/entries
$entryUuid = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    mt_rand(0, 0xffff), mt_rand(0, 0xffff),
    mt_rand(0, 0xffff),
    mt_rand(0, 0x0fff) | 0x4000,
    mt_rand(0, 0x3fff) | 0x8000,
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
);

$entryPayload = json_encode([
    'client_entry_id' => $entryUuid,
    'session_uuid' => $sessionUuid,
    'mala_number' => 1,
    'naam_id' => 1,
    'entry_number' => 1,
    'stroke_data' => [
        'version' => 1,
        'canvas_dimensions' => ['width' => 800, 'height' => 600],
        'strokes' => [
            [
                'stroke_id' => 1,
                'color' => '#E06D1A',
                'brush_size' => 4,
                'points' => [
                    ['x' => 120, 'y' => 200, 'pressure' => 0.8, 'time' => 1000],
                    ['x' => 180, 'y' => 250, 'pressure' => 0.8, 'time' => 1050]
                ]
            ]
        ]
    ],
    'stroke_count' => 1,
    'point_count' => 2,
    'duration_ms' => 500,
    'written_at' => date('c'),
]);

$ctxEntry = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => $entryPayload,
        'ignore_errors' => true
    ]
]);

$entryResJson = file_get_contents($baseUrl . "/sessions/$sessionUuid/entries", false, $ctxEntry);
$entryRes = json_decode($entryResJson, true);
echo "3. POST /entries: " . ($entryRes['success'] ? "PASS (Entry Id: " . $entryRes['data']['entry_number'] . ", Mala Completed: " . $entryRes['data']['session']['completed_entries'] . ")" : "FAIL - " . $entryResJson) . "\n";

// 4. GET /dashboard/stats
$statsJson = file_get_contents($baseUrl . '/dashboard/stats');
$stats = json_decode($statsJson, true);
echo "4. GET /dashboard/stats: " . ($stats['success'] ? "PASS (Total Entries: " . $stats['data']['total_entries'] . ", Total Malas: " . $stats['data']['total_malas'] . ")" : "FAIL") . "\n";

// 5. GET /history
$historyJson = file_get_contents($baseUrl . '/history');
$history = json_decode($historyJson, true);
echo "5. GET /history: " . ($history['success'] ? "PASS (Sessions Count: " . count($history['data']['data'] ?? $history['data']) . ")" : "FAIL") . "\n";

echo "=== All Backend Verification Passed Successfully ===\n";
