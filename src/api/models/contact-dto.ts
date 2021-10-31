import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    subject: string;
    
    @IsNotEmpty()
    message: string;
}