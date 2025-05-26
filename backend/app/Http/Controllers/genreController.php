<?php

namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\User;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class genreController extends Controller
{
    public function addGenre(Request $request)
    {
        // Validate genre name
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:genres,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create and save new genre
        $genre = new Genre();
        $genre->name = $request->input("name");
        $genre->save();

        return response()->json(['success' => 'Genre saved successfully'],201);
    }



    public function editGenre(Request $request)
    {
        // Validate genre ID and name
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:genres,id',
            'name' => 'required|string|max:255|unique:genres,name', // Unique validation excludes current ID
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $id = $request->input('id');
        // Find the genre by ID
        $genre = Genre::find($id);

        // Check if genre exists
        if (!$genre) {
            return response()->json(['error' => 'Genre not found'], 404);
        }

        // Update genre name
        $genre->name = $request->input('name');
        $genre->save();

        return response()->json(['success' => 'Genre updated']);
    }


    function topGenre($id)
    {
        $limit = 5;

        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'user not Exists']);
        }
        $user_id = $id;

        $genres = User::select('genres.name as genre_name')
            ->leftJoin('favorite_shows_lists', 'users.id', '=', 'favorite_shows_lists.user_id')
            ->leftJoin('shows', 'favorite_shows_lists.show_id', '=', 'shows.id')
            ->leftJoin('genres', 'shows.genre_id', '=', 'genres.id')
            ->where('users.id', $user_id)->limit($limit)
            ->get();

        return response()->json($genres);
    }

    function filterGenre($id)
    {
        $shows = Show::where('genre_id', $id)->get();
        return response()->json($shows, 200);
    }

    function getGenres()
    {
        $genres = Genre::all();
        return response()->json($genres, 200);
    }

    public function deleteGenre($id)
    {
        // Validate genre ID
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:genres,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Find the genre by ID
        $genre = Genre::find($id);

        // Check if genre exists
        if (!$genre) {
            return response()->json(['error' => 'Genre not found'], 404);
        }

        // Delete the genre
        $genre->delete();

        return response()->json(['success' => 'Genre deleted']);
    }

    function getGenre($id)
    {
        $genre = Genre::find($id);
        return response()->json($genre);
    }
}
