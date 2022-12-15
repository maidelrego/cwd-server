import { IsString, MinLength } from 'class-validator';

export class CreateCloudinaryImageDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  url: string;

  @IsString()
  folder: string;

  @IsString()
  assetId: string;
}
