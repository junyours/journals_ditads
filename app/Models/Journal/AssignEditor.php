<?php

namespace App\Models\Journal;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssignEditor extends Model
{
    protected $table = "assign_editors";

    protected $fillable = [
        'request_id',
        'editor_id',
        'edited_file',
        'published_file',
        'published_at',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class, 'request_id');
    }
}
