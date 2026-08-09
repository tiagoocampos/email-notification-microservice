import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MailModule],
})
export class AppModule { }
