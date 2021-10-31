import { MailerService } from '@nestjs-modules/mailer';
import { Body, Post, Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactDto } from './models';

@Controller('api')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) { }

  @Post('contact')
  @UsePipes(new ValidationPipe({ transform: true }))
  async contact(@Body() contact: ContactDto): Promise<string> {
    await this.mailerService
      .sendMail({
        to: this.configService.get<string>('email.to'),
        from: '"Julien Lagneaux Website" <contact@julienlagneaux.fr>',
        subject: contact.subject,
        text: contact.message,
        template: __dirname + '/../templates/contact',
        context: {
          name: contact.name,
          email: contact.email,
          message: contact.message
        },
      })

    return
  }
}
