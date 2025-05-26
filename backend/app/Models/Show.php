<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'release_date', 'genre_id','rate','poster_img'
    ];

    public function planToWatchLists()
    {
        return $this->hasMany(PlanToWatchList::class);
    }

    public function favoriteShowsList()
    {
        return $this->hasMany(FavoriteShowsList::class);
    }

    public function rates()
    {
        return $this->hasMany(Rate::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function news()
    {
        return $this->hasMany(News::class);
    }
}
