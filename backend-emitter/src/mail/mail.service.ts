import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async sendVerificationEmail(to: string, name: string, verifyUrl: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"Expenses Control" <${process.env.SMTP_USER}>`,
                to,
                subject: 'Confirme seu email',
                html: `<p>Olá, ${name}!</p><p>Clique no link abaixo para confirmar seu email:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
            });
            console.log('Email enviado com sucesso:', info.messageId);
        } catch (error) {
            console.error('ERRO ao enviar email:', error);
        }
    }
}