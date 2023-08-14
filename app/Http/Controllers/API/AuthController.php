<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (!auth()->attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'errors' => ['login' => ['Could not login with the provided credentials.']]
            ], 401);
        }

        $token = auth()->user()->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => auth()->user(),
            'token' => $token
        ], 200);
    }
    //-----------------------------------------------------------------------------------
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required']
        ]);

        $credentials['password'] = bcrypt($credentials['password']);

        $user = User::create($credentials);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token
        ], 200);
    }
    //-----------------------------------------------------------------------------------
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully.'
        ], 200);
    }
}
