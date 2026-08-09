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
        await this.transporter.sendMail({
            from: `"Expenses Control" <${process.env.SMTP_USER}>`,
            to,
            subject: 'Confirme seu email',
            html: `
      <p>Olá, ${name}!</p>
      <p>Clique no link abaixo para confirmar seu email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
        });

        console.log('Email de verificação enviado para', to);
    }
}