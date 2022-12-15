import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  message: string;

  @IsBoolean()
  isRead: boolean;
}
