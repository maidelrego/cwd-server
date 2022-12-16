import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CloudinaryImagesService } from './cloudinary-images.service';
import { CreateCloudinaryImageDto } from './dto/create-cloudinary-image.dto';
import { UpdateCloudinaryImageDto } from './dto/update-cloudinary-image.dto';
// import { UpdateCloudinaryImageDto } from './dto/update-cloudinary-image.dto';

@Controller('cloudinary-images')
export class CloudinaryImagesController {
  constructor(
    private readonly cloudinaryImagesService: CloudinaryImagesService,
  ) {}

  @Get('doorDesigns')
  async getDoorDesigns() {
    return await this.cloudinaryImagesService.getCloudinaryImages('Designs');
  }

  @Get('finishColors')
  async getDinishColors() {
    return await this.cloudinaryImagesService.getCloudinaryImages('Finish');
  }

  @Get('doorKits')
  async getDoorKits() {
    return await this.cloudinaryImagesService.getCloudinaryImages('DoorKits');
  }

  @Get('handles')
  async getHandles() {
    return await this.cloudinaryImagesService.getCloudinaryImages('Handles');
  }

  @Get('galleryImages')
  async getGalleryImages() {
    return await this.cloudinaryImagesService.getCloudinaryImages('Gallery');
  }

  @Post()
  create(@Body() createCloudinaryImageDto: CreateCloudinaryImageDto) {
    return this.cloudinaryImagesService.create(createCloudinaryImageDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cloudinaryImagesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCloudinaryImageDto: UpdateCloudinaryImageDto,
  ) {
    return this.cloudinaryImagesService.update(id, updateCloudinaryImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cloudinaryImagesService.remove(id);
  }
}
