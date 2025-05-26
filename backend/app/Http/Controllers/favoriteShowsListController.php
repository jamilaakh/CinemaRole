<?php

namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\FavoriteShowsList;

class favoriteShowsListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    function getFavoriteShowsList($id){
        $userId = $id;
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }


        $list = $this->ORM_favoriteShows_List_User($userId);
        return response()->json($list);
    }
    

    function deleteShowFavoriteList(Request $request){

        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'show_id' => 'required|integer|exists:shows,id',
        ]);

        $userId = $request->input('user_id');
        $showId = $request->input('show_id');

        // $user = User::find($userId);

        // if (!$user) {
        //     return response()->json(['error' => 'User not found'], 404);
        // }

        // $show = Show::find($showId);
        // if (!$show) {
        //     return response()->json(['error' => 'Show not found'], 404);
        // }

        $list = $this->ORM_favorite_One_User_Show($userId , $showId);
        if (count($list)==0) {
            return response()->json(['error' => 'Show is not in the list'], 400);
        }

        if ( $list[0]->delete() ){
            return response()->json(['success' => 'show has been removed'], 200);
        }
        response()->json(['error' => 'problem in delete'], 205);

    }

    function addShowFavoriteList(Request $request){
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'show_id' => 'required|integer|exists:shows,id',
        ]);

        $favoriteList = new FavoriteShowsList();
        $favoriteList->user_id = $request->input('user_id');
        $favoriteList->show_id = $request->input('show_id');

        $userId = $request->input('user_id');
        $showId = $request->input('show_id');

        $list = $this->ORM_favorite_One_User_Show($userId , $showId);
        if (count($list)!=0) {
            return response()->json(['error' => 'Show is already in the list'], 400);
        }

        if ($favoriteList->save()) {
            return response()->json(['success' => 'show has been added','favoriteList'=>$favoriteList], 200);
        }
        response()->json(['error' => 'problem in save'], 500);

    }



    


    /**
     * return one show in favorite list of a user
     */
    function ORM_favorite_One_User_Show($userId , $showId) {

        $list = FavoriteShowsList::where('user_id', $userId)
        ->where('show_id',$showId)
        ->limit(1)
        ->get();
        
        return $list;
    }


    /**
     * return all shows in plan to watch list of a user
     */
    function ORM_favoriteShows_List_User($userId) {

        $list = FavoriteShowsList::where('user_id', $userId)
        ->with(['show' , 'show.genre'])
        ->get()
        ->pluck('show');

        

        return $list;
    }

    
}
