import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service.js';

interface UserRegisteredPayload {
    name: string;
    email: string;
    verifyUrl: string;
}

@Controller()
export class MailController {
    constructor(private mailService: MailService) { }

    @EventPattern('user.registered')
    async handleUserRegistered(@Payload() data: UserRegisteredPayload) {
        console.log('Evento recebido:', data);
        await this.mailService.sendVerificationEmail(data.email, data.name, data.verifyUrl);
    }
}