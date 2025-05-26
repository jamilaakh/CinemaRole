<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Rate;
use App\Models\Show;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class rateController extends Controller
{
    function updateRate(Request $request)
    {
        $show_id = $request->input('show_id');
        $user_id = $request->input('user_id');
        $score = $request->input('score');
        
        if ($score > 100 || $score < 0) {
            return response()->json(['error' => 'score invalid'], 500);
        }
        
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found' ], 404);
        }

        $show = Show::find($show_id);
        if (!$show) {
            return response()->json(['error' => 'Show not found'], 404);
        }

        $rate = Rate::where('show_id', $show_id)
            ->where('user_id', $user_id)
            ->first();

        // Check if the rate record exists
        if ($rate) {
            $rate->score = $score;
            $rate->save();

            $activity = new Activity();
            $activity->user_id = $user_id;
            $activity->show_id = $show_id;
            $activity->action = "you edited the rate of this show '".$show["title"]."'  score ".$score."/100" ;
            $activity->list_type=null;
            $activity->save();
            $this->rateShow();
            return response()->json(['success' => 'rated success'], 200);

        }

        $rate =  new Rate();
        $rate->user_id = $user_id;
        $rate->show_id = $show_id;
        $rate->score = $score;
        $rate->save();

        $activity = new Activity();
        $activity->user_id = $user_id;
        $activity->show_id = $show_id;
        $activity->action = "you rated this show '".$show["title"]."'  score ".$score."/100" ;
        $activity->list_type=null;
        $activity->save();

        $this->rateShow();
        return response()->json(['success' => 'rated success','activity'=>'success'], 200);
    }






    function deleteRate(Request $request)
    {
        // Retrieve parameters from the request
        $show_id = $request->input('show_id');
        $user_id = $request->input('user_id');

        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $show = Show::find($show_id);
        if (!$show) {
            return response()->json(['error' => 'Show not found'], 404);
        }

        // Find the rate record
        $rate = Rate::where('show_id', $show_id)
            ->where('user_id', $user_id)
            ->first();

        // Check if the rate record exists
        if (!$rate) {
            return response()->json(['error' => 'Rate record not found'], 404);
        }

        // Check if the authenticated user is authorized to delete the rate record
        if ($rate->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Delete the rate record
        $rate->delete();

        return response()->json(['success' => 'Rate record deleted successfully'], 200);
    }


    function rateShow()
    {
        $showIds = Rate::distinct()->pluck('show_id');
        foreach ($showIds as $show_id) {
            $show = Show::find($show_id);
            $rates = Rate::where('show_id', $show_id)->get()->pluck('score');
            $avgScore = $rates->average();
            $show->rate=$avgScore;
            $show->save();
        }
        return response()->json(["success"=>"update score successfully"]);
       
    }
}
