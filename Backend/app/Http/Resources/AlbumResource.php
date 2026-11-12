<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
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
          'title' => $this->title,
          'cover' => $this->cover ? asset('storage/' . $this->cover): null,
          'release_date' => $this->release_date?->format('d/m/y'),
          'artist' => new SongResource($this->whenLoaded('artist')),
          'songs' => SongResource::collection($this->whenLoaded('songs')), 
        ];
    }
}
