import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private resend = new Resend(process.env.RESEND_API_KEY);

    async sendVerificationEmail(to: string, name: string, verifyUrl: string) {
        try {
            const { data, error } = await this.resend.emails.send({
                from: 'Expenses Control <onboarding@resend.dev>',
                to,
                subject: 'Confirme seu email',
                html: `<p>Olá, ${name}!</p><p>Clique no link abaixo para confirmar seu email:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
            });

            if (error) {
                console.error('Erro ao enviar email:', error);
                return;
            }
            console.log('Email enviado, id:', data?.id);
        } catch (err) {
            console.error('Exceção ao enviar email:', err);
        }
    }
}