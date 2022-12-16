import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUs } from './entities/contact-us.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [ContactUsController],
  providers: [ContactUsService],
  imports: [
    TypeOrmModule.forFeature([ContactUs]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class ContactUsModule {}
