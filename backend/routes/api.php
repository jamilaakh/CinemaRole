<?php

/**
 * TODO
 * never forget the Middleware need Token in Header after every request Json 
 * 
 */

use App\Http\Controllers\activityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\securityController;
use App\Http\Controllers\planToWatchController;
use App\Http\Controllers\favoriteShowsListController;
use App\Http\Controllers\genreController;
use App\Http\Controllers\newsController;
use App\Http\Controllers\rateController;
use App\Http\Controllers\showController;




/***********POST*********/
Route::post('/register', [securityController::class, 'register']);
Route::post('/login',[securityController::class,'login']);
Route::post('/logout',[securityController::class,'logout'])->middleware('auth:sanctum');


Route::post('/delete/planToWatch/', [planToWatchController::class, 'deleteShowPlanToWatchList'])->middleware('auth:sanctum');
Route::post('/delete/favorite/', [favoriteShowsListController::class, 'deleteShowFavoriteList'])->middleware('auth:sanctum');;

Route::post('/add/planToWatch/', [planToWatchController::class, 'addShowPlanToWatchList'])->middleware('auth:sanctum');
Route::post('/add/favorite/', [favoriteShowsListController::class, 'addShowFavoriteList'])->middleware('auth:sanctum');;



Route::post('/rate/show/', [rateController::class, 'updateRate'])->middleware('auth:sanctum');


Route::post('/edit/user/', [userController::class, 'editUser'])->middleware('auth:sanctum');
Route::post('/delete/user/{id}', [userController::class, 'deleteUser'])->middleware('auth:sanctum');


Route::post('/add/news',[newsController::class,'addNews'])->middleware('auth:sanctum');
Route::post('/edit/news',[newsController::class,'editNews'])->middleware('auth:sanctum');
Route::post('/delete/news/{id}',[newsController::class,'deleteNews'])->middleware('auth:sanctum');



Route::post('/add/show',[showController::class,'addShow'])->middleware('auth:sanctum');;
Route::post('/delete/show/{id}',[showController::class,'deleteShow'])->middleware('auth:sanctum');
Route::post('/edit/show/',[showController::class,'editShow'])->middleware('auth:sanctum');


Route::post('/delete/genre/{id}',[genreController::class,'deleteGenre'])->middleware('auth:sanctum');
Route::post('/edit/genre/',[genreController::class,'editGenre'])->middleware('auth:sanctum');
Route::post('/add/genre/',[genreController::class,'addGenre'])->middleware('auth:sanctum');



/**********GET***************/


Route::get('/favorite/{id}', [favoriteShowsListController::class, 'getFavoriteShowsList']);
Route::get('/planToWatch/{id}', [planToWatchController::class, 'getPlanToWatchList']);



Route::get('/profile/topGenre/{id}',[genreController::class,'topGenre'])->middleware('auth:sanctum');
Route::get('/profile/activity/{id}',[activityController::class,'getActivities'])->middleware('auth:sanctum');


Route::get('/shows/genre/{id}',[genreController::class,'filterGenre']);
Route::get('/shows',[showController::class,'getShows']);
Route::get('/show/{id}',[showController::class,'getShow']);


Route::get('/genres',[genreController::class,'getGenres']);
Route::get('/genre/{id}',[genreController::class,'getGenre']);



Route::get('/news/all',[newsController::class,'getAllNews']);
Route::get('/news/{id}',[newsController::class,'getNews']);


Route::get('/admin/users',[userController::class,'getAllUsers'])->middleware('auth:sanctum');
Route::get('/user/{id}',[userController::class,'getUser'])->middleware('auth:sanctum');

Route::get('/search-shows', [showController::class, 'SearchShows']);



// // Email Verification Routes
// Route::get('/email/verify/{id}/{hash}', [securityController::class, 'verifyEmail'])
//     ->middleware(['signed'])
//     ->name('verification.verify');



// Route::post('/email/resend', [securityController::class, 'resendVerificationEmail'])
//     ->middleware(['auth:sanctum', 'throttle:6,1'])
//     ->name('verification.send');

// // Protected Routes (only accessible after email verification)
// Route::middleware(['auth:sanctum', 'verified'])->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });




