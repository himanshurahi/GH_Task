<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
}
