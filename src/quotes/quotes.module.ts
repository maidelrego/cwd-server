import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [
    TypeOrmModule.forFeature([Quote]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class QuotesModule {}
