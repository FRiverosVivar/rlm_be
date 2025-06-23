import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/utils/prisma.service'
import { CreateRoomingListDto } from './dto/create-rooming-list.dto'
import { UpdateRoomingListDto } from './dto/update-rooming-list.dto'

@Injectable()
export class RoomingListsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomingListDto: CreateRoomingListDto) {
    return this.prisma.roomingList.create({ data: createRoomingListDto })
  }

  async update(roomingListId: string, updateRoomingListDto: UpdateRoomingListDto) {
    await this.findOne(roomingListId)

    const data = { ...updateRoomingListDto }

    return this.prisma.roomingList.update({
      where: { roomingListId },
      data,
    })
  }

  async remove(roomingListId: string) {
    await this.findOne(roomingListId)
    return this.prisma.roomingList.delete({ where: { roomingListId } })
  }

  async findByEventId(eventId: string, includeRelations = false) {
    return this.prisma.roomingList.findMany({
      where: { eventId },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                booking: true,
              },
            },
          }
        : undefined,
    })
  }

  async findAll(includeRelations = false) {
    return this.prisma.roomingList.findMany({
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                booking: true,
              },
            },
          }
        : undefined,
    })
  }

  async findOne(roomingListId: string, includeRelations = false) {
    const roomingList = await this.prisma.roomingList.findUnique({
      where: { roomingListId },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                booking: true,
              },
            },
          }
        : undefined,
    })
    if (!roomingList) throw new NotFoundException(`RoomingList with ID ${roomingListId} not found`)
    return roomingList
  }
  async findByHotelId(hotelId: string, includeRelations = false) {
    return this.prisma.roomingList.findMany({
      where: { hotelId },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                booking: true,
              },
            },
          }
        : undefined,
    })
  }

  async findByStatus(status: string, includeRelations = false) {
    return this.prisma.roomingList.findMany({
      where: { status: status as any },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                booking: true,
              },
            },
          }
        : undefined,
    })
  }
}
