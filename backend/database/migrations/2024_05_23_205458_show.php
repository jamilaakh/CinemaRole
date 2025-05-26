<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shows', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('release_date')->nullable();
            $table->unsignedBigInteger('genre_id')->nullable();
            $table->string('poster_img')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shows');

    }
};
