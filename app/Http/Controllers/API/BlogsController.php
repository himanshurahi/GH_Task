<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogsController extends Controller
{

    public function getAssets()
    {
        $data = [];
        $data['users'] = User::select('id', 'name')->get();

        return $this->successResponse($data);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = Blog::with('author')->withCount('likes', 'comments');
        $list->searchFilter(request()->search);
        $list->authorFilter(request()->author);
        $list->orderBy('id', 'desc');
        $list = $list->paginate(10);

        return $this->successResponse($list);
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

        return $this->successResponse($blog);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $blog = Blog::with('author', 'comments.user')->withCount('likes', 'comments')->where('slug', $slug)->first();
        if (!$blog) {
            return $this->errorResponse('Blog not found', 404);
        }
        return $this->successResponse($blog);
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
    public function update(Request $request, string $slug)
    {
        $inputs = $request->all();
        $request->validate([
            'title'       => 'required',
            'content'     => 'required',
        ]);


        $blog = Blog::where('slug', $slug)->first();

        $this->authorize('update',[$blog,  auth()->user()]);


        if (!$blog) {
            return $this->errorResponse('Blog not found', 404);
        }

        $inputs['slug'] = Str::slug($inputs['title']);

        $blog->update($inputs);

        return $this->successResponse($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);
        $this->authorize('delete',[$blog,  auth()->user()]);

        if (!$blog) {
            return $this->errorResponse('Blog not found', 404);
        }

        $blog->delete();
        return $this->successResponse([]);
    }

    //-----------------------------------------------------------------------------------
    private static function itemActionValidation($request, $action)
    {
        $rules = [];
        $rules['data'] = 'nullable|array';
        $rules['action'] = 'required';
        $messages = [];
        if($action === 'add_comment')
        {
            $rules['data.content'] = 'required';
            $messages = [
                'data.content.required' => 'Comment content is required',
            ];
        }
        $validator = \Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors'  => $validator->errors()
            ], 422);
        }
    }
    //-----------------------------------------------------------------------------------
    public function itemAction(Request $request, $id)
    {

        $inputs = $request->all();
        $action = $inputs['action'];
        $data = $inputs['data'] ?? [];

        $validator = self::itemActionValidation($request, $action);

        if($validator) {
            return $validator;
        }

        $blog = Blog::with('author', 'comments.user')
            ->withCount('likes', 'comments')
            ->where('id', $id)->first();
        switch ($action) {
            case 'like':
                $blog->likes()->attach(auth()->user()->id);
                break;
            case 'dislike':
                $blog->likes()->detach(auth()->user()->id);
                break;
            case 'add_comment':
                $blog->comments()->create([
                    'user_id' => auth()->user()->id,
                    'content' => $data['content']
                ]);
                break;
            case 'delete_comment':
                $blog->comments()->where('id', $data['id'])->delete();
                break;
            default:
                break;
        }

        $blog->loadCount('likes', 'comments');
        $blog->load('comments.user');

        return $this->successResponse($blog);
    }
    //-----------------------------------------------------------------------------------
    private function successResponse($data, $statusCode = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data
        ], $statusCode);
    }

    private function errorResponse($message, $statusCode)
    {
        return response()->json([
            'success' => false,
            'message' => $message
        ], $statusCode);
    }
}
