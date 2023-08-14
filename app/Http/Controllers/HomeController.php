<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    //-----------------------------------------------------------------------------------
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = auth()->user()->id . '_blog_image_' . time() . '.' . $request->image->extension();

        $request->image->storeAs('public/images', $imageName);

        return response()->json([
            'success' => true,
            'data'    => $imageName
        ], 200);
    }
}
