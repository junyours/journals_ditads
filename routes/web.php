<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/settings/profile', [SettingController::class, 'profile'])->name('setting.profile');
    Route::get('/settings/password', [SettingController::class, 'password'])->name('setting.password');
    Route::post('/settings/password/update', [SettingController::class, 'updatePassword'])->name('setting.password.update');

    Route::get('/notifications', [NotificationController::class, 'getNotification'])->name('notification');
    Route::post('/notifications/read', [NotificationController::class, 'readNotification'])->name('notification.read');

    Route::get('/users/profile', [AdminController::class, 'getUserProfile'])->name('user.profile');

});

Route::middleware(['auth', 'admin', 'verified'])->group(function () {

    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    Route::get('/admin/users/editors', [AdminController::class, 'getEditor'])->name('admin.user.editor');
    Route::post('/admin/users/editors/add', [AdminController::class, 'addEditor'])->name('admin.user.add.editor');
    Route::post('/admin/users/editors/update', [AdminController::class, 'updateEditor'])->name('admin.user.update.editor');

    Route::get('/admin/users/clients', [AdminController::class, 'getClient'])->name('admin.user.client');

    Route::get('/admin/web/research-journals', [WebController::class, 'getResearchJournal'])->name('admin.web.research.journal');
    Route::post('/admin/web/research-journals/upload', [WebController::class, 'uploadResearchJournal'])->name('admin.web.research.journal.upload');
    Route::get('/admin/web/magazines', [WebController::class, 'getMagazine'])->name('admin.web.magazine');
    Route::get('/admin/web/book-publications', [WebController::class, 'getBookPublication'])->name('admin.web.book.publication');

});

Route::get('/', [WebController::class, 'welcome'])->name('welcome');
Route::get('/about-us', [WebController::class, 'aboutUs']);
Route::get('/research-journals', [WebController::class, 'researchJournal']);
Route::get('/magazines', [WebController::class, 'magazine']);
Route::get('/book-publications', [WebController::class, 'bookPublication']);
Route::get('/contact-us', [WebController::class, 'contactUs']);

require __DIR__ . '/auth.php';

require __DIR__ . '/journal.php';
