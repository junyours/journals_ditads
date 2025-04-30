<?php

namespace App\Http\Controllers;

use App\Models\Journal\AssignEditor;
use App\Models\Journal\ResearchJournal;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebController extends Controller
{
    public function getResearchJournal(Request $request)
    {
        $search = $request->input('search');

        $journals = ResearchJournal::select('assign_editor_id', 'title')
            ->with([
                'assign_editor' => function ($query) {
                    $query->select('id', 'published_file');
                }
            ])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhereHas('assign_editor', function ($q) use ($search) {
                            $q->where(DB::raw("SUBSTRING_INDEX(published_file, '/', -1)"), 'like', '%' . $search . '%');
                        });
                });
            })
            ->latest()
            ->paginate(10);

        $documents = AssignEditor::select("id", "published_file")
            ->whereDoesntHave('research_journal')
            ->whereHas('request.payment', function ($query) {
                $query->where('status', 'approved');
            })
            ->latest('published_at')
            ->get()
            ->map(function ($document) {
                $document->published_file = basename($document->published_file);
                return $document;
            });

        return Inertia::render("Web/Admin/ResearchJournal", [
            "journals" => $journals,
            "documents" => $documents
        ]);
    }

    public function uploadResearchJournal(Request $request)
    {
        $request->validate([
            'id' => ['required'],
            'title' => ['required'],
            'author' => ['required'],
            'abstract' => ['required'],
            'keyword' => ['required']
        ], [
            'id.required' => 'The document field is required.'
        ]);

        // Set base year for volume tracking
        $baseYear = 2025;
        $currentYear = now()->year;
        $currentMonth = now()->month;

        // Determine volume (e.g., 2025 = Volume 1)
        $volume = $currentYear - $baseYear + 1;

        // Determine issue based on current quarter
        if ($currentMonth >= 1 && $currentMonth <= 3) {
            $issue = 1;
        } elseif ($currentMonth >= 4 && $currentMonth <= 6) {
            $issue = 2;
        } elseif ($currentMonth >= 7 && $currentMonth <= 9) {
            $issue = 3;
        } else {
            $issue = 4;
        }

        ResearchJournal::create([
            'assign_editor_id' => $request->id,
            'title' => $request->title,
            'author' => $request->author,
            'abstract' => $request->abstract,
            'keyword' => $request->keyword,
            'volume' => $volume,
            'issue' => $issue
        ]);
    }

    public function getMagazine()
    {
        return Inertia::render("Web/Admin/Magazine");
    }

    public function getBookPublication()
    {
        return Inertia::render("Web/Admin/BookPublication");
    }

    public function welcome()
    {
        return Inertia::render("Web/Welcome");
    }

    public function aboutUs()
    {
        return Inertia::render("Web/AboutUs");
    }

    public function researchJournal(Request $request)
    {
        $search = $request->input('search');

        $journals = ResearchJournal::select('assign_editor_id', 'title', 'author', 'abstract', 'keyword', 'volume', 'issue', 'created_at')
            ->with([
                'assign_editor' => function ($query) {
                    $query->select('id', 'published_file');
                }
            ])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%');
                });
            })
            ->latest()
            ->paginate(50);

        $editors = User::select('name', 'position', 'email', 'school', 'avatar')
            ->where('role', 'editor')
            ->get();

        return Inertia::render("Web/ResearchJournal/Layout", [
            "journals" => $journals,
            "editors" => $editors
        ]);
    }

    public function magazine()
    {
        $editors = User::select('name', 'position', 'email', 'school', 'avatar')
            ->where('role', 'editor')
            ->get();

        return Inertia::render("Web/Magazine/Layout", [
            "editors" => $editors
        ]);
    }

    public function bookPublication()
    {
        return Inertia::render("Web/BookPublication");
    }

    public function contactUs()
    {
        return Inertia::render("Web/ContactUs");
    }
}
