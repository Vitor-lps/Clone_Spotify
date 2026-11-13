<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id', 'title', 'cover', 'release_date'
    ];

    protected function casts(): array {
        return[
            'release_date' => 'date',
        ];
    }


public function artist(): BelongsTo
{
    return $this->belongsTo(Artist::class);
}

public function songs(): HasMany
{
    return $this->hasMany(Song::class);
}

public function title(): Attribute
{
    return Attribute::make(
        set: fn ($value) => strtoupper($value),
    );
}

}