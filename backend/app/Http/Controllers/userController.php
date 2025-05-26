<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class userController extends Controller
{
    
    function getUser($id)
    {
        $userId = $id;
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user, 200);

    }
    
    function editUser(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $request->input('id'),
            'profile' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:200048',
            'cover' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:200048',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::find($request->input('id'));
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        

        if ($request->hasFile('profile')) {
            $profile = $request->file('profile');

            if ($profile->isValid()) {
                // Delete the old profile picture if exists
                if ($user->profile_picture) {
                    Storage::delete($user->profile_picture);
                }
                $path = $profile->store('profile');
                $user->profile_picture = $path;
            }
        }


        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');

            if ($cover->isValid()) {
                // Delete the old cover picture if exists
                if ($user->cover_picture) {
                    Storage::delete($user->cover_picture);
                }
                $path = $cover->store('cover');
                $user->cover_picture = $path;
            }
        }

        if ($request->has('removeProfile')) {
            if ($request->input('removeProfile')) {
                Storage::delete($user->profile_picture);
                $user->profile_picture=null;
            }
        }

        if ($request->has('removeCover')) {
            if ($request->input('removeCover')) {
                Storage::delete($user->cover_picture);
                $user->cover_picture=null;
            }
        }


        if($user->save()){
            return response()->json(['user'=>$user,'success' => 'user saved'], 200);
        }

        return response()->json(['error' => 'user not saved'], 500);

    }
    
    function deleteUser($id){
        $user = User::find($id);
        if(!$user){
            return response()->json(["error"=>"user does not exist"],404);
        }
        if($user->delete()){
            return response()->json(["success"=>"user has been deleted "],200);
        }
        return response()->json(["error"=>"problem in user delete"],500);

    }
    
    function getAllUsers()  {
        $user = User::all();
        return response()->json($user,200);
    }


    
    
}
