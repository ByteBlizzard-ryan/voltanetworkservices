<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;

class ContactController extends Controller
{
  public function sendContactEmail(Request $request)
    {
        $request->validate([
            'from_name' => 'required|string',
            'reply_to' => 'required|email',
            'phone' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $data = $request->all();

        // 🚀 Envoi du mail stylisé via la classe ContactMessageMail
        Mail::to('admin@voltanetwork.com')->send(new ContactMessageMail($data));

        return response()->json([
            'success' => true, 
            'message' => 'Message envoyé avec succès !'
        ]);
    }
}