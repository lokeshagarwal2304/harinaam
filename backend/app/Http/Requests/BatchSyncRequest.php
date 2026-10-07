<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BatchSyncRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'entries' => 'required|array|min:1',
            'entries.*.client_entry_id' => 'required|uuid',
            'entries.*.stroke_data' => 'required|array',
            'entries.*.mala_number' => 'nullable|integer',
            'entries.*.entry_number' => 'nullable|integer',
            'entries.*.written_at' => 'nullable|date',
        ];
    }
}
