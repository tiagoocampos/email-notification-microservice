import { Injectable } from '@nestjs/common';
import { BrevoClient } from '@getbrevo/brevo';

@Injectable()
export class MailService {
    private brevo = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY!,
    });

    async sendVerificationEmail(to: string, name: string, verifyUrl: string) {
        try {
            const result = await this.brevo.transactionalEmails.sendTransacEmail({
                sender: { email: process.env.BREVO_SENDER_EMAIL!, name: 'Expenses Control' },
                to: [{ email: to, name }],
                subject: 'Confirme seu email',
                htmlContent: `<p>Olá, ${name}!</p><p>Clique no link abaixo para confirmar seu email:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
            });
            console.log('Email enviado:', result);
        } catch (err) {
            console.error('Erro ao enviar email:', err);
        }
    }
}