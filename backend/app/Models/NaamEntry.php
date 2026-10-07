<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NaamEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_entry_id',
        'session_id',
        'mala_id',
        'naam_id',
        'entry_number',
        'stroke_data',
        'stroke_count',
        'point_count',
        'duration_ms',
        'written_at',
    ];

    protected $casts = [
        'stroke_data' => 'array',
        'entry_number' => 'integer',
        'stroke_count' => 'integer',
        'point_count' => 'integer',
        'duration_ms' => 'integer',
        'written_at' => 'datetime',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class);
    }

    public function mala(): BelongsTo
    {
        return $this->belongsTo(Mala::class);
    }

    public function naam(): BelongsTo
    {
        return $this->belongsTo(Naam::class);
    }
}
