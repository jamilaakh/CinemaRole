<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PlanToWatchList;
use App\Models\Show;
use Illuminate\Http\Request;

class planToWatchController extends Controller
{
    function getPlanToWatchList($id){
        $userId = $id;
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }


        $list = $this->ORM_planToWatch_List_User($userId);
        return response()->json($list);
    }

    function deleteShowPlanToWatchList(Request $request){

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

        $list = $this->ORM_planToWatch_One_User_Show($userId , $showId);
        if (count($list)==0) {
            return response()->json(['error' => 'Show is not in the list'], 404);
        }

        if ( $list[0]->delete() ){
            return response()->json(['success' => 'show has been removed'], 200);
        }
        response()->json(['error' => 'problem in delete'], 500);
        
    }



    function addShowPlanToWatchList(Request $request){
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'show_id' => 'required|integer|exists:shows,id',
        ]);

        $planToWatch = new PlanToWatchList();
        $planToWatch->user_id = $request->input('user_id');
        $planToWatch->show_id = $request->input('show_id');

        $userId = $request->input('user_id');
        $showId = $request->input('show_id');

        $list = $this->ORM_planToWatch_One_User_Show($userId , $showId);
        if (count($list)!=0) {
            return response()->json(['error' => 'Show is already in the list'], 400);
        }


        if ($planToWatch->save()) {
            return response()->json(['success' => 'show has been added','PlanToWatch'=>$planToWatch], 200);
        }
        response()->json(['error' => 'problem in save'], 500);

    }

     /**
     * return one show in plan to watch list of a user
     */
    function ORM_planToWatch_One_User_Show($userId , $showId) {

        $list = PlanToWatchList::where('user_id', $userId)
        ->where('show_id',$showId)
        ->limit(1)
        ->get();
        
        return $list;
    }



    /**
     * return all shows in plan to watch list of a user
     */
    function ORM_planToWatch_List_User($userId) {

        $list = PlanToWatchList::where('user_id', $userId)
        ->with(['show' , 'show.genre'])
        ->get()
        ->pluck('show');

        return $list;
    }
}
