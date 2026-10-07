<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('naam_entries', function (Blueprint $table) {
            $table->id();
            $table->uuid('client_entry_id')->unique();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->foreignId('mala_id')->constrained('malas')->cascadeOnDelete();
            $table->foreignId('naam_id')->constrained('naams')->restrictOnDelete();
            $table->unsignedInteger('entry_number');
            $table->json('stroke_data');
            $table->unsignedSmallInteger('stroke_count')->default(1);
            $table->unsignedInteger('point_count')->default(0);
            $table->unsignedInteger('duration_ms')->default(0);
            $table->timestamp('written_at');
            $table->timestamps();

            $table->index('session_id');
            $table->index('mala_id');
            $table->index('naam_id');
            $table->index('written_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('naam_entries');
    }
};
