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
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BookingsService } from './bookings.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'List of all bookings' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (event and rooming list bookings)',
  })
  async findAll(@Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean) {
    return this.bookingsService.findAll(relations)
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get bookings by event ID' })
  @ApiResponse({ status: 200, description: 'List of bookings for the specified event' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (event and rooming list bookings)',
  })
  async findByEventId(
    @Param('eventId') eventId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.bookingsService.findByEventId(eventId, relations)
  }

  @Get('hotel/:hotelId')
  @ApiOperation({ summary: 'Get bookings by hotel ID' })
  @ApiResponse({ status: 200, description: 'List of bookings for the specified hotel' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (event and rooming list bookings)',
  })
  async findByHotelId(
    @Param('hotelId') hotelId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.bookingsService.findByHotelId(hotelId, relations)
  }

  @Get('date-range')
  @ApiOperation({ summary: 'Get bookings within a date range' })
  @ApiResponse({ status: 200, description: 'List of bookings within the specified date range' })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: Date,
    description: 'Start date for the range (ISO string)',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: Date,
    description: 'End date for the range (ISO string)',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (event and rooming list bookings)',
  })
  async findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.bookingsService.findByDateRange(new Date(startDate), new Date(endDate), relations)
  }

  @Get(':bookingId')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking found' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (event and rooming list bookings)',
  })
  async findOne(
    @Param('bookingId') bookingId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.bookingsService.findOne(bookingId, relations)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error or duplicate ID' })
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto)
  }

  @Patch(':bookingId')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({ status: 200, description: 'Booking updated successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  async update(@Param('bookingId') bookingId: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(bookingId, updateBookingDto)
  }

  @Delete(':bookingId')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async remove(@Param('bookingId') bookingId: string) {
    return this.bookingsService.remove(bookingId)
  }

  @Get('rooming_list/:roomingListId')
  @ApiOperation({ summary: 'Get bookings by rooming list ID' })
  @ApiResponse({ status: 200, description: 'Bookings found' })
  @ApiResponse({ status: 404, description: 'No bookings found for this rooming list' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: Boolean,
    description: 'Include related data (event and rooming list bookings)',
  })
  async findByRoomingListId(
    @Param('roomingListId') roomingListId: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations?: boolean,
  ) {
    return this.bookingsService.findByRoomingListId(roomingListId, relations)
  }
}
