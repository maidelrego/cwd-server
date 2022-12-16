import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createContactUsDto: CreateContactUsDto) {
    return this.contactUsService.create(createContactUsDto);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: number,
    @Body() updateContactUsDto: UpdateContactUsDto,
  ) {
    return this.contactUsService.update(id, updateContactUsDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.contactUsService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactUsService.findOne(id);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactUsService.remove(+id);
  }
}
