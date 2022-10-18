import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber('US')
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsPositive()
  @IsNumber()
  zip: number;

  @IsString()
  doorKit: string;

  @IsString()
  doorDesign: string;

  @IsString()
  finishColor: string;

  @IsString()
  doorHandle: string;

  @IsBoolean()
  @IsOptional()
  delivery?: boolean;

  @IsBoolean()
  @IsOptional()
  install?: boolean;

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  dimensions?: string[];
}
