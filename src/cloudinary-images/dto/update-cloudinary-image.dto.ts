import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudinaryImageDto } from './create-cloudinary-image.dto';

export class UpdateCloudinaryImageDto extends PartialType(
  CreateCloudinaryImageDto,
) {}
