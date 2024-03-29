import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryImagesModule } from '../cloudinary-images/cloudinary-images.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  imports: [
    CloudinaryImagesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class CloudinaryModule {}
