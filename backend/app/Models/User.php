<?php

namespace App\Models;

use App\Models\Activity;
use App\Models\PlanToWatchList;
use App\Models\FavoriteShowsList;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_picture',
        'cover_picture',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function planToWatchList()
    {
        return $this->hasMany(PlanToWatchList::class);
    }
    

    public function favoriteShowsList()
    {
        return $this->hasMany(FavoriteShowsList::class)->get();
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function rates()
    {
        return $this->hasMany(Rate::class);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail); // or any custom notification you have
    }
}
