<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'content', 'show_id','image',
    ];

    public function show()
    {
        return $this->belongsTo(Show::class);
    }
   
}
