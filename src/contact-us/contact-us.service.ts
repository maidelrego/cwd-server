import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { ContactUs } from './entities/contact-us.entity';

@Injectable()
export class ContactUsService {
  private readonly logger = new Logger('ContactUsService');

  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto) {
    try {
      const contactUs = this.contactUsRepository.create(createContactUsDto);
      await this.contactUsRepository.save(contactUs);
      return contactUs;
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  findAll() {
    const contactUs = this.contactUsRepository.find();
    return contactUs;
  }

  async findOne(id: number) {
    const contactUs = await this.contactUsRepository.findOneBy({ id: id });
    if (!contactUs)
      throw new BadRequestException(`Data with id ${id} not found`);

    return contactUs;
  }

  async remove(id: number) {
    const contacUsToDelete = await this.findOne(id);
    if (contacUsToDelete) {
      await this.contactUsRepository.delete(id);
      return 'Message deleted';
    }
  }

  // will habdle all the errors and return a nice error message
  private handleDatabaseExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server');
  }
}
