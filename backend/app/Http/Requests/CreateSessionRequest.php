<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'session_uuid' => 'required|uuid',
            'naam_id' => 'required|exists:naams,id',
            'target_malas' => 'required|integer|min:1|max:108',
            'device_uuid' => 'nullable|uuid',
            'device_type' => 'nullable|in:web,mobile,tablet,eink_device',
            'user_name' => 'nullable|string|max:100',
            'devotee_name' => 'nullable|string|max:100',
        ];
    }
}
