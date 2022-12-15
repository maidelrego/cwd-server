import { Module } from '@nestjs/common';
import { CloudinaryImagesService } from './cloudinary-images.service';
import { CloudinaryImagesController } from './cloudinary-images.controller';
import { CloudinaryImage } from './entities/cloudinary-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CloudinaryImagesController],
  providers: [CloudinaryImagesService],
  imports: [TypeOrmModule.forFeature([CloudinaryImage])],
  exports: [TypeOrmModule, CloudinaryImagesService],
})
export class CloudinaryImagesModule {}
