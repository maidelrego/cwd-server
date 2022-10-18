import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [TypeOrmModule.forFeature([Quote])],
})
export class QuotesModule {}
