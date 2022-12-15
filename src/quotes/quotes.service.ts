import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './entities/quote.entity';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async create(createQuoteDto: CreateQuoteDto) {
    try {
      const quote = this.quotesRepository.create(createQuoteDto);
      await this.quotesRepository.save(quote);
      return quote;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    try {
      const quote = await this.findOne(id);
      if (quote) {
        await this.quotesRepository.update(id, updateQuoteDto);
        return await this.findOne(id);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const allQuotes = await this.quotesRepository.find();
    return allQuotes;
  }

  async findOne(id: number) {
    const quote = await this.quotesRepository.findOneBy({ id: id });
    if (!quote)
      throw new BadRequestException('Quote with id ' + id + ' not found');

    return quote;
  }

  async remove(id: number) {
    const removeQuote = await this.findOne(id);

    if (removeQuote) {
      await this.quotesRepository.delete(id);
      return `Quote for ${removeQuote.firstName} ${removeQuote.lastName} has been deleted`;
    }
  }
}
