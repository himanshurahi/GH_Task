<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::with('author')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data'    => $blogs
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inputs = $request->all();
        $request->validate([
            'title'       => 'required',
            'content'     => 'required',
        ]);

        $inputs['created_by'] = auth()->user()->id ?? User::first()->id;
        $inputs['slug'] = Str::slug($inputs['title']);

        $blog = Blog::create($inputs);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function itemAction(Request $request, $type, $id)
    {
        switch ($type) {
            case 'like':
                $blog = Blog::find($id);
                $blog->likes = $blog->likes + 1;
                $blog->save();
                break;
            case 'dislike':
                $blog = Blog::find($id);
                $blog->dislikes = $blog->dislikes + 1;
                $blog->save();
                break;
            default:
                break;
        }
    }
}
