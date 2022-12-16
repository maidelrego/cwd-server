import {
  Post,
  UseInterceptors,
  UploadedFile,
  Controller,
  Delete,
  Param,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { CreateCloudinaryImageDto } from '../cloudinary-images/dto/create-cloudinary-image.dto';
import { CloudinaryImagesService } from '../cloudinary-images/cloudinary-images.service';
import { ValidRoles } from '../auth/interfaces/valid-roles.insterface';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    private cloudinary: CloudinaryService,
    private cloudinaryImageService: CloudinaryImagesService,
  ) {}

  @Post('upload')
  @Auth(ValidRoles.admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageToCloudinary(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCloudinaryImageDto: CreateCloudinaryImageDto,
  ) {
    try {
      const uploadedImage = await this.cloudinary.uploadImage(file);

      if (uploadedImage) {
        createCloudinaryImageDto.url = uploadedImage.secure_url;
        createCloudinaryImageDto.assetId = uploadedImage.asset_id;
        const dbImageData = await this.cloudinaryImageService.create(
          createCloudinaryImageDto,
        );
        return dbImageData;
      } else {
        throw new InternalServerErrorException('There was an error uploading');
      }
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async deleteImageFromCloudinary(@Param('id') id: number) {
    const cloudinaryImageData = await this.cloudinaryImageService.remove(id);
    const asset_id = cloudinaryImageData.assetId;
    await this.cloudinary.deleteImages(asset_id);
    return 'Image deleted';
  }

  private handleDatabaseExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.error(error);
    throw new InternalServerErrorException('Unexpected error, check server');
  }
}
