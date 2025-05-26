<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rates', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('show_id');
            $table->unsignedBigInteger('score')->default(0);
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('show_id')->references('id')->on('shows')->onDelete('cascade')->onUpdate('cascade');
        });

        DB::statement('ALTER TABLE rates ADD CONSTRAINT chk_score CHECK (score >= 0 AND score <= 100)');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE rates DROP CONSTRAINT chk_score');

        Schema::dropIfExists('rates');
    }
};
