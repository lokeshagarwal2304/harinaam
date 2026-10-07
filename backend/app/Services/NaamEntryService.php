<?php

namespace App\Services;

use App\Models\Session;
use App\Models\Mala;
use App\Models\NaamEntry;
use Illuminate\Support\Facades\DB;

class NaamEntryService
{
    /**
     * Record a single Naam entry idempotently
     */
    public function recordEntry(Session $session, array $data): array
    {
        return DB::transaction(function () use ($session, $data) {
            $clientEntryId = $data['client_entry_id'];

            // 1. Check if already exists (Idempotent replay)
            $existing = NaamEntry::where('client_entry_id', $clientEntryId)->first();
            if ($existing) {
                return [
                    'entry' => $existing,
                    'is_duplicate' => true,
                    'session' => $session->fresh(['naam', 'malas']),
                ];
            }

            // 2. Find or calculate current active Mala
            $currentMala = Mala::where('session_id', $session->id)
                ->where('status', 'in_progress')
                ->first();

            if (!$currentMala) {
                $currentMala = Mala::where('session_id', $session->id)
                    ->where('status', 'pending')
                    ->orderBy('mala_number', 'asc')
                    ->first();

                if ($currentMala) {
                    $currentMala->update(['status' => 'in_progress', 'started_at' => now()]);
                }
            }

            $malaId = $currentMala ? $currentMala->id : null;
            $newCompletedEntries = $session->completed_entries + 1;

            $entry = NaamEntry::create([
                'client_entry_id' => $clientEntryId,
                'session_id' => $session->id,
                'mala_id' => $malaId,
                'naam_id' => $session->naam_id,
                'entry_number' => $newCompletedEntries,
                'stroke_data' => $data['stroke_data'] ?? [],
                'stroke_count' => $data['stroke_count'] ?? 1,
                'point_count' => $data['point_count'] ?? 0,
                'duration_ms' => $data['duration_ms'] ?? 0,
                'written_at' => $data['written_at'] ?? now(),
            ]);

            // 3. Update Mala count
            if ($currentMala) {
                $currentMala->increment('completed_entries');
                if ($currentMala->completed_entries >= $currentMala->target_entries) {
                    $currentMala->update([
                        'status' => 'completed',
                        'completed_at' => now(),
                    ]);
                    $session->increment('completed_malas');

                    // Activate next Mala if exists
                    $nextMala = Mala::where('session_id', $session->id)
                        ->where('mala_number', $currentMala->mala_number + 1)
                        ->first();
                    if ($nextMala) {
                        $nextMala->update(['status' => 'in_progress', 'started_at' => now()]);
                    }
                }
            }

            // 4. Update Session count
            $session->increment('completed_entries');
            if ($session->completed_entries >= $session->target_entries) {
                $session->update([
                    'status' => 'completed',
                    'completed_at' => now(),
                ]);
            }

            return [
                'entry' => $entry,
                'is_duplicate' => false,
                'session' => $session->fresh(['naam', 'malas']),
            ];
        });
    }
}
