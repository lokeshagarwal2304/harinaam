<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_uuid',
        'user_id',
        'device_id',
        'devotee_name',
        'naam_id',
        'target_malas',
        'completed_malas',
        'target_entries',
        'completed_entries',
        'status',
        'started_at',
        'completed_at',
        'duration_seconds',
    ];

    protected $casts = [
        'target_malas' => 'integer',
        'completed_malas' => 'integer',
        'target_entries' => 'integer',
        'completed_entries' => 'integer',
        'duration_seconds' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }

    public function naam(): BelongsTo
    {
        return $this->belongsTo(Naam::class);
    }

    public function malas(): HasMany
    {
        return $this->hasMany(Mala::class)->orderBy('mala_number', 'asc');
    }

    public function entries(): HasMany
    {
        return $this->hasMany(NaamEntry::class)->orderBy('entry_number', 'asc');
    }
}
