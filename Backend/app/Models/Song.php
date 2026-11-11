<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Song extends Model
{
    protected $fillable = [
        'album_id', 'title', 'duration', 'file_path', 'plays'
    ];

public function album(): BelongsTo
{
    return $this->belongsTo(Album::class);
}

public function playlists(): BelongsToMany
{
    return $this->belongsToMany(Playlist::class)->withTimestamps();
}

protected function durationFormatted(): Attribute
{
    return Attribute::make(
        get: fn () => sprintf(
            "%02d:%02d",
            intdiv($this->duration, 60),
            $this->duration % 60
        ),
    );
}
}
