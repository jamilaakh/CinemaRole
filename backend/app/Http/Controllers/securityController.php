<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;

use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class securityController extends Controller
{
    function login(Request $request) {
        

        $email = $request->input('email');
        $password = $request->input('password');
        if (empty([$email,$password])) {
            return response()->json(["error"=>"email or password is empty"],404);
        }
        $user = User::where('email',$email)->first();
        if ($user==null) {
            return response()->json(["error"=>"email does not exist"],404);
        }
        if( !Hash::check($password,$user['password'])){
            return response()->json(["error"=>"email or password is wrong"],403);

        }

        event(new Registered($user));


        return response()->
        json([
            'user'=>$user,
            'token'=>$user->createToken('auth_token')->plainTextToken
        ],200) ;

    }

    function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Successfully logged out'
        ],200);
    }


    function register(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'profile' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240',
            'cover' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240', 
            
        ]);
       

        if (User::where('email', $request->input('email'))->exists()) {
            return response()->json(['error' => 'Email already exists'], 409);
        }      


        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make( $request->input('password'));

        if ($request->hasFile('profile')) {
            $profile = $request->file('profile');
            
            if ($profile->isValid()) {
               $path = $profile->store('profile');
               $user->profile_picture = $path;
            }

        }

        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');
            
            if ($cover->isValid()) {
               $path = $profile->store('cover');
               $user->cover_picture = $path;
            }

        }

        if($user->save()){
            return response()->json(['success' => 'user saved'], 200);
        }

        return response()->json(['error' => 'user not saved'], 500);

    }


    // public function verifyEmail(EmailVerificationRequest $request)
    // {
    //     if ($request->user()->hasVerifiedEmail()) {
    //         return response()->json(['message' => 'Email already verified'], 200);
    //     }

    //     if ($request->user()->markEmailAsVerified()) {
    //         event(new Verified($request->user()));
    //     }

    //     return response()->json(['message' => 'Email verified successfully'], 200);
    // }

    // public function resendVerificationEmail(Request $request)
    // {
    //     if ($request->user()->hasVerifiedEmail()) {
    //         return response()->json(['message' => 'Email already verified'], 200);
    //     }

    //     $request->user()->sendEmailVerificationNotification();

    //     return response()->json(['message' => 'Verification email resent'], 200);
    // }

}