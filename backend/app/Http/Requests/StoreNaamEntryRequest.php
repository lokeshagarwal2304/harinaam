<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNaamEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_entry_id' => 'required|uuid',
            'mala_number' => 'nullable|integer|min:1',
            'entry_number' => 'nullable|integer|min:1',
            'stroke_data' => 'required|array',
            'stroke_count' => 'nullable|integer|min:1',
            'point_count' => 'nullable|integer|min:1',
            'duration_ms' => 'nullable|integer|min:0',
            'written_at' => 'nullable|date',
        ];
    }
}
