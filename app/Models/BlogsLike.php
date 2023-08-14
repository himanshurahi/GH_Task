<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BlogsLike extends Pivot
{
    use HasFactory;

    protected $table = 'blogs_like';

    protected $fillable = [
        'blog_id',
        'user_id',
    ];
}
