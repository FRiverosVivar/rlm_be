import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'
import { RoomingListsService } from './rooming_lists.service'
import { CreateRoomingListDto } from './dto/create-rooming-list.dto'
import { UpdateRoomingListDto } from './dto/update-rooming-list.dto'

@ApiTags('rooming-lists')
@Controller('rooming_lists')
export class RoomingListsController {
  constructor(private readonly roomingListsService: RoomingListsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rooming list' })
  @ApiResponse({ status: 201, description: 'Rooming list created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createRoomingListDto: CreateRoomingListDto) {
    return this.roomingListsService.create(createRoomingListDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooming lists' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include related data' })
  @ApiResponse({ status: 200, description: 'List of rooming lists' })
  findAll(@Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean) {
    return this.roomingListsService.findAll(relations)
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get rooming lists by event ID' })
  @ApiParam({ name: 'eventId', description: 'Event ID' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include related data' })
  @ApiResponse({ status: 200, description: 'List of rooming lists for the event' })
  findByEventId(
    @Param('eventId') eventId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.roomingListsService.findByEventId(eventId, relations)
  }

  @Get('hotel/:hotelId')
  @ApiOperation({ summary: 'Get rooming lists by hotel ID' })
  @ApiParam({ name: 'hotelId', description: 'Hotel ID' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include related data' })
  @ApiResponse({ status: 200, description: 'List of rooming lists for the hotel' })
  findByHotelId(
    @Param('hotelId') hotelId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.roomingListsService.findByHotelId(hotelId, relations)
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get rooming lists by status' })
  @ApiParam({ name: 'status', description: 'Rooming list status' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include related data' })
  @ApiResponse({ status: 200, description: 'List of rooming lists with the specified status' })
  findByStatus(
    @Param('status') status: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.roomingListsService.findByStatus(status, relations)
  }

  @Get(':roomingListId')
  @ApiOperation({ summary: 'Get a rooming list by ID' })
  @ApiParam({ name: 'roomingListId', description: 'Rooming list ID' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include related data' })
  @ApiResponse({ status: 200, description: 'Rooming list found' })
  @ApiResponse({ status: 404, description: 'Rooming list not found' })
  findOne(
    @Param('roomingListId') roomingListId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.roomingListsService.findOne(roomingListId, relations)
  }

  @Patch(':roomingListId')
  @ApiOperation({ summary: 'Update a rooming list' })
  @ApiParam({ name: 'roomingListId', description: 'Rooming list ID' })
  @ApiResponse({ status: 200, description: 'Rooming list updated successfully' })
  @ApiResponse({ status: 404, description: 'Rooming list not found' })
  update(@Param('roomingListId') roomingListId: string, @Body() updateRoomingListDto: UpdateRoomingListDto) {
    return this.roomingListsService.update(roomingListId, updateRoomingListDto)
  }

  @Delete(':roomingListId')
  @ApiOperation({ summary: 'Delete a rooming list' })
  @ApiParam({ name: 'roomingListId', description: 'Rooming list ID' })
  @ApiResponse({ status: 200, description: 'Rooming list deleted successfully' })
  @ApiResponse({ status: 404, description: 'Rooming list not found' })
  remove(@Param('roomingListId') roomingListId: string) {
    return this.roomingListsService.remove(roomingListId)
  }
}
