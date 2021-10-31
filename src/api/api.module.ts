import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    controllers: [ApiController],
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT),
                    auth: {
                        user: process.env.EMAIL_AUTH_USER,
                        pass: process.env.EMAIL_AUTH_PASSWORD,
                    },
                },
                template: {
                    adapter: new EjsAdapter(),
                },
            })
        }),
    ],
})
export class ApiModule { }
