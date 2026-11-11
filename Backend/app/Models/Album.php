<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Album extends Model
{
    protected $fillable = [
        'artist_id', 'title', 'cover', 'release_date'
    ];


public function artist(): BelongsTo
{
    return $this->belongsTo(Artist::class);
}

public function songs(): HasMany
{
    return $this->hasMany(Song::class);
}

public function playlists(): Attribute
{
    return Attribute::make(
        set: fn ($value) => strtoupper($value),
    );
}

}