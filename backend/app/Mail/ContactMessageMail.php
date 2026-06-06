<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        // On passe les données du formulaire à la vue
        $this->data = $data;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->data['reply_to'], $this->data['from_name']),
            replyTo: [new Address($this->data['reply_to'], $this->data['from_name'])],
            subject: '⚡ Volta Network - Nouvelle demande de contact',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact', // Pointe vers resources/views/emails/contact.blade.php
        );
    }
}