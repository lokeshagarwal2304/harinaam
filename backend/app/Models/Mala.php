<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mala extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'mala_number',
        'target_entries',
        'completed_entries',
        'status',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'mala_number' => 'integer',
        'target_entries' => 'integer',
        'completed_entries' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class);
    }

    public function entries(): HasMany
    {
        return $this->hasMany(NaamEntry::class);
    }
}
