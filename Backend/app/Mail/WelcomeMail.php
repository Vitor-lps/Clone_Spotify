<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    // Recebe o usuário que acabou de se cadastrar
    public function __construct(public User $user)
    {
    }

    // Qual é o assunto do e-mail
    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Bem-vindo ao SpotiClone!');
    }

    // Qual é o conteúdo (a "carta" em si)
    public function content(): Content
    {
        return new Content(view: 'emails.welcome');
    }
}