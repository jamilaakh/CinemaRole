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
        Schema::table('shows', function (Blueprint $table) {
            // Add the 'rate' column
            $table->unsignedInteger('rate')->default(0);
        });

        // Add the check constraint for 'rate' column using raw SQL
        DB::statement('ALTER TABLE shows ADD CONSTRAINT chk_rate CHECK (rate >= 0 AND rate <= 100)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE shows DROP CONSTRAINT chk_rate');

        Schema::table('shows', function (Blueprint $table) {
            // Drop the 'rate' column
            $table->dropColumn('rate');
        });
    }
};
