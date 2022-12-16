import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCloudinaryImageDto } from './dto/create-cloudinary-image.dto';
import { CloudinaryImage } from './entities/cloudinary-image.entity';
import { UpdateCloudinaryImageDto } from './dto/update-cloudinary-image.dto';

@Injectable()
export class CloudinaryImagesService {
  private readonly logger = new Logger('CloudinaryImagesService');

  constructor(
    @InjectRepository(CloudinaryImage)
    private readonly cloudinaryImageRepository: Repository<CloudinaryImage>,
  ) {}

  async create(createCloudinaryImageDto: CreateCloudinaryImageDto) {
    try {
      const cloudinaryImage = this.cloudinaryImageRepository.create(
        createCloudinaryImageDto,
      );
      await this.cloudinaryImageRepository.save(cloudinaryImage);
      return cloudinaryImage;
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  async getCloudinaryImages(folderName: string) {
    const cloudinaryImages = await this.cloudinaryImageRepository.find({
      where: { folder: folderName },
    });
    return cloudinaryImages;
  }

  async findOne(id: number) {
    const cloudinaryImage = await this.cloudinaryImageRepository.findOneBy({
      id: id,
    });
    return cloudinaryImage;
  }

  async update(id: number, updateCloudinaryImageDto: UpdateCloudinaryImageDto) {
    try {
      const cloudinaryImage = await this.cloudinaryImageRepository.findOneBy({
        id: id,
      });
      if (cloudinaryImage) {
        const updatedData = await this.cloudinaryImageRepository.update(
          id,
          updateCloudinaryImageDto,
        );
        return updatedData;
      }
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  async remove(id: number) {
    const cloudinaryImage = await this.findOne(id);

    if (cloudinaryImage) {
      await this.cloudinaryImageRepository.remove(cloudinaryImage);
      return cloudinaryImage;
    } else {
      throw new BadRequestException('Cloudinary image not found');
    }
  }

  private handleDatabaseExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server');
  }
}
