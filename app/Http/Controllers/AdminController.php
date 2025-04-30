<?php

namespace App\Http\Controllers;

use App\Models\Journal\AssignEditor;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mail;
use Str;
use Hash;
use App\Mail\PasswordMail;

class AdminController extends Controller
{
    public function dashboard()
    {
        $requests = \App\Models\Journal\Request::select(
            DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
            DB::raw("COUNT(id) as total_requests")
        )
            ->where('status', 'approved')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        $sales = \App\Models\Journal\Request::select(
            DB::raw("DATE_FORMAT(payments.created_at, '%Y-%m') as month"),
            DB::raw("SUM(amount) as total_amount")
        )
            ->join('payments', 'requests.id', '=', 'payments.request_id')
            ->where('payments.status', 'approved')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        $published = AssignEditor::select(
            DB::raw("DATE_FORMAT(published_at, '%Y-%m') as month"),
            DB::raw("COUNT(id) as total_published")
        )
            ->whereNotNull('published_at')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return Inertia::render("Dashboard", [
            "requests" => $requests,
            "sales" => $sales,
            "published" => $published
        ]);
    }

    public function getEditor(Request $request)
    {
        $editors = User::select('id', 'name', 'position', 'email', 'avatar')
            ->where('role', 'editor')
            ->get();

        return Inertia::render("Users/Editor/List", [
            "editors" => $editors,
        ]);
    }

    public function addEditor(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:users'],
            'name' => ['required'],
            'position' => ['required'],
        ]);

        $password = Str::random(8);

        $file = $request->file('avatar');

        if ($file) {
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

            $file->storeAs('users/avatar', $filename, 'public');
        }

        Mail::to($request->email)->send(new PasswordMail($password, $request->name));

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'email_verified_at' => now(),
            'password' => Hash::make($password),
            'is_default' => 1,
            'role' => 'editor',
            'position' => $request->position,
            'avatar' => $filename ?? null,
            'school' => $request->school
        ]);
    }

    public function getClient(Request $request)
    {
        $clients = User::select('id', 'name', 'email', 'avatar')
            ->where('role', 'client')
            ->get();

        return Inertia::render("Users/Client/List", [
            "clients" => $clients,
        ]);
    }

    public function getUserProfile(Request $request)
    {
        $information = User::where('id', $request->id)
            ->whereNot('role', 'admin')
            ->firstOrFail();

        return Inertia::render("Users/Profile", [
            "information" => $information
        ]);
    }
}
