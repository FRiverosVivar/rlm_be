import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (roomingList and booking)',
  })
  async findAll(@Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean) {
    return this.eventsService.findAll(relations)
  }

  @Get(':id')
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (roomingList and booking)',
  })
  async findOne(
    @Param('id') id: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.eventsService.findOne(id, relations)
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id)
  }
}
