<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OtpVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;

    /**
     * Crée une nouvelle instance de message.
     */
    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    /**
     * Définit l'enveloppe du message (Sujet).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre code de vérification - VOLTA NETWORK',
        );
    }

    /**
     * Définit le contenu du message.
     */
    public function content(): Content
    {
        return new Content(
            htmlString: "
                <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                    <h2>Bienvenue chez VOLTA NETWORK</h2>
                    <p>Merci pour votre inscription. Veuillez utiliser le code de vérification unique ci-dessous pour activer votre compte. Ce code est valable pendant 10 minutes.</p>
                    <div style='background: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0;'>
                        {$this->otp}
                    </div>
                    <p style='font-size: 11px; color: #9ca3af;'>Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail en toute sécurité.</p>
                </div>
            ",
        );
    }
}