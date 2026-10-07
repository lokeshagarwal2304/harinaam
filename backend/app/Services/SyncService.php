<?php

namespace App\Services;

use App\Models\Session;
use Illuminate\Support\Facades\DB;

class SyncService
{
    public function __construct(
        protected NaamEntryService $naamEntryService
    ) {}

    /**
     * Batch process offline synced entries
     */
    public function processBatchSync(Session $session, array $entries): array
    {
        $processed = 0;
        $inserted = 0;
        $duplicates = 0;

        DB::transaction(function () use ($session, $entries, &$processed, &$inserted, &$duplicates) {
            foreach ($entries as $entryData) {
                $result = $this->naamEntryService->recordEntry($session, $entryData);
                $processed++;
                if ($result['is_duplicate']) {
                    $duplicates++;
                } else {
                    $inserted++;
                }
            }
        });

        return [
            'processed_count' => $processed,
            'inserted_count' => $inserted,
            'duplicate_count' => $duplicates,
            'session' => $session->fresh(['naam', 'malas']),
        ];
    }
}
