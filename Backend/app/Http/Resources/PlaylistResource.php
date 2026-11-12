<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaylistResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'cover' => $this->cover ? asset('storage/' . $this->cover) : null,
            'total_songs' => $this->whenCounted('songs'),
            'songs' => SongResource::collection($this->whenLoaded('songs')),
        ];
    }
}
