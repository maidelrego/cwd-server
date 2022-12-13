import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
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

  @IsInt()
  zip: number;

  @IsString()
  doorKit: string;

  @IsString()
  doorDesign: string;

  @IsString()
  finishColor: string;

  @IsString()
  doorHandle: string;

  @IsString()
  @IsOptional()
  installOrDelivery?: string;

  @IsNumber()
  @IsOptional()
  dimensionsH?: number;

  @IsNumber()
  @IsOptional()
  dimensionsW?: number;
}
