<?php

namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class showController extends Controller
{
       function getShows() {
            $shows = Show::with('genre')->get();
            if ($shows) {
                return response()->json($shows , 200);
            }
            return response()->json(["message"=>"no show exist"] , 300);
       }

       function getShow($id) {
        $show = Show::with('genre')->find($id);
        if ($show) {
            return response()->json($show , 200);
        }
        return response()->json(["message"=>"no show exist"] , 300);

        }

    //     function addShow(Request $request) {

    //         $validator = Validator::make($request->all(), [
    //             'title' => 'required|string|max:255',
    //             'description' => 'nullable|string|max:255',
    //             'poster' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:200048',
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json(['error' => $validator->errors()], 422);
    //         }

    //         $show = new Show();
    //         $show->title = $request->input("title");
    //         $show->description = $request->input("description");
    //         if ($request->has('poster')) {
    //             $img = $request->file("poster");
    //             $path = $img->store('show');
    //             $show->poster_img = $path;
    //         }
    //         if($show->save()){
    //             return response()->json(["success"=>" show added ",'show'=>$show] , 200);
    //         }

    //         return response()->json(["message"=>"no show saved "] , 500);

    //     }


    function addShow(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'genre_id' => 'nullable|exists:genres,id',
            'rate' => 'nullable|numeric',
            'poster_img' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:200048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create a new show instance
        $show = new Show;

        // Set show attributes
        $show->title = $request->input('title');
        $show->description = $request->input('description');
        $show->release_date = $request->input('release_date');
        $show->genre_id = $request->input('genre_id');
        $show->rate = $request->input('rate');

        // Handle poster image upload if provided
        if ($request->hasFile('poster_img')) {
            $poster = $request->file('poster_img');

            if ($poster->isValid()) {
                $path = $poster->store('show');
                $show->poster_img = $path;
            }
        }

        // Save the new show
        if ($show->save()) {
            return response()->json(['show' => $show, 'success' => 'Show created successfully'], 201);
        } else {
            return response()->json(['error' => 'Failed to create show'], 500);
        }
    }


    function deleteShow(int $id)
    {
        // Find the show by ID
        $show = Show::findOrFail($id);
        if (!$show) {
            return response()->json(['error' => 'show does not exist'], 404);
        }
        Storage::delete($show->poster_img);
        // Attempt to delete the show
        if ($show->delete()) {
            return response()->json(['message' => 'Show deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to delete show'], 500);
        }
    }

    public function editShow(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:shows,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'genre_id' => 'nullable|exists:genres,id',
            'rate' => 'nullable|numeric',
            'poster_img' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:200048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Find the show by ID
        $show = Show::findOrFail($request->input('id'));

        // Update show attributes
        $show->title = $request->input('title');
        $show->description = $request->input('description');
        $show->release_date = $request->input('release_date');
        $show->genre_id = $request->input('genre_id');
        $show->rate = $request->input('rate');

        // Handle poster image update if provided
        if ($request->hasFile('poster_img')) {
            $poster = $request->file('poster_img');

            if ($poster->isValid()) {
                // Delete the old poster picture if exists
                if ($show->poster_img) {
                    Storage::delete($show->poster_img);
                }
                $path = $poster->store('show');
                $show->poster_img = $path;
            }
        } elseif ($request->input('remove_poster')) {
            if ($show->poster_img) {
                Storage::delete($show->poster_img);
                $show->poster_img = null;
            }
        }

        // Save the updated show
        if ($show->save()) {
            return response()->json(['show' => $show, 'success' => 'Show updated successfully'], 200);
        } else {
            return response()->json(['error' => 'Failed to update show'], 500);
        }
    }

    function SearchShows(Request $request)
    {
        $query = $request->input('query');
        $shows = Show::where('title', 'LIKE', "%{$query}%")
                      //->orWhere('description', 'LIKE', "%{$query}%")
                      ->get();
        return response()->json($shows);
    }

    
}
