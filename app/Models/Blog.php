<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'title',
        'content',
        'slug',
        'created_by',
        'image',
    ];
    //-----------------------------------------------------------------------------------

    protected $appends = [
        'liked', 'full_image_path'
    ];

    //-----------------------------------------------------------------------------------

    public function getLikedAttribute()
    {
        if(auth()->check() && auth()->user()->id) {
            return $this->likes()->where('user_id', auth()->user()->id)->exists();
        }
        return false;
    }
    //-----------------------------------------------------------------------------------

    public function getFullImagePathAttribute()
    {
        if($this->image) {
            return asset('storage/images/' . $this->image);
        }
        return null;
    }

    //-----------------------------------------------------------------------------------

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    //-----------------------------------------------------------------------------------

    public function likes()
    {
        return $this->belongsToMany(User::class, 'blogs_like', 'blog_id', 'user_id');
    }

    //-----------------------------------------------------------------------------------

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id');
    }
    //-----------------------------------------------------------------------------------

    public function scopeSearchFilter($query, $search)
    {
        return $query->where('title', 'like', '%' . $search . '%')
            ->orWhere('content', 'like', '%' . $search . '%');
    }
    //-----------------------------------------------------------------------------------
    public function scopeAuthorFilter($query, $author)
    {

        return $query->when($author, function($q) use ($author) {
            return $q->where('created_by', $author);
        });
    }
}
