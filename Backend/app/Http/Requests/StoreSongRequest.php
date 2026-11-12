<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSongRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'album_id' => ['required', 'exists:albums,id'],
            'title' => ['required', 'string', 'max:120'],
            'duration' => ['required', 'integer', 'min:1'],
            'file' => ['nullable', 'file', 'mimes:mp3,wav', 'max:20480'],
        ];
    }
}
