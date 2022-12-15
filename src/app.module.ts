import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUsModule } from './contact-us/contact-us.module';
import { QuotesModule } from './quotes/quotes.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryImagesModule } from './cloudinary-images/cloudinary-images.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ContactUsModule,
    QuotesModule,
    CloudinaryModule,
    CloudinaryImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
