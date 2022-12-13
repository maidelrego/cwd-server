import {
  BadRequestException,
  Post,
  UseInterceptors,
  UploadedFile,
  Controller,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinary: CloudinaryService) {}

  @Get('doorDesigns')
  async getDoorDesigns() {
    return await this.cloudinary.getDoorDesigns();
  }

  @Get('finishColors')
  async getDinishColors() {
    return await this.cloudinary.getFinishColors();
  }

  @Get('galleryImages')
  async getGalleryImages() {
    return await this.cloudinary.getGalleryImages();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}