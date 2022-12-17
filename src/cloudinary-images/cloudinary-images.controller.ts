import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CloudinaryImagesService } from './cloudinary-images.service';
import { CreateCloudinaryImageDto } from './dto/create-cloudinary-image.dto';
import { UpdateCloudinaryImageDto } from './dto/update-cloudinary-image.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
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
  @Auth(ValidRoles.admin)
  create(@Body() createCloudinaryImageDto: CreateCloudinaryImageDto) {
    return this.cloudinaryImagesService.create(createCloudinaryImageDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id') id: number) {
    return this.cloudinaryImagesService.findOne(+id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: number,
    @Body() updateCloudinaryImageDto: UpdateCloudinaryImageDto,
  ) {
    return this.cloudinaryImagesService.update(id, updateCloudinaryImageDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: number) {
    return this.cloudinaryImagesService.remove(id);
  }
}
