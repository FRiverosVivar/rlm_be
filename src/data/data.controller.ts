import { Controller, Post, Get, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common'
import { DataService } from './data.service'
import {
  CreateRoomingListBookingRelationsDto,
  RoomingListBookingRelationDto,
} from './dto/create-rooming-list-booking-relation.dto'

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('rooming-list-booking-relations')
  async createRoomingListBookingRelations(@Body() createDto: CreateRoomingListBookingRelationsDto) {
    return this.dataService.createRoomingListBookingRelations(createDto.relations)
  }

  @Get('rooming-list/:roomingListId/bookings')
  async getRoomingListBookings(@Param('roomingListId', ParseUUIDPipe) roomingListId: string) {
    return this.dataService.getRoomingListBookings(roomingListId)
  }

  @Get('booking/:bookingId/rooming-lists')
  async getBookingRoomingLists(@Param('bookingId', ParseUUIDPipe) bookingId: string) {
    return this.dataService.getBookingRoomingLists(bookingId)
  }

  @Delete('rooming-list/:roomingListId/booking/:bookingId')
  async removeRoomingListBookingRelation(
    @Param('roomingListId', ParseUUIDPipe) roomingListId: string,
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
  ) {
    return this.dataService.removeRoomingListBookingRelation(roomingListId, bookingId)
  }

  @Delete('rooming-list/:roomingListId/bookings')
  async removeAllRoomingListBookingRelations(@Param('roomingListId', ParseUUIDPipe) roomingListId: string) {
    return this.dataService.removeAllRoomingListBookingRelations(roomingListId)
  }
}
