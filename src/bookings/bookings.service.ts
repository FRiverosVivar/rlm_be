import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/utils/prisma.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(includeRelations = false) {
    return this.prisma.booking.findMany({
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                roomingList: true,
              },
            },
          }
        : undefined,
    })
  }

  async findOne(bookingId: string, includeRelations = false) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingId },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                roomingList: true,
              },
            },
          }
        : undefined,
    })
    if (!booking) throw new NotFoundException(`Booking with ID ${bookingId} not found`)
    return booking
  }

  async create(createBookingDto: CreateBookingDto) {
    try {
      const { eventId, ...rest } = createBookingDto
      return this.prisma.booking.create({
        data: {
          ...rest,
          event: {
            connect: {
              id: eventId,
            },
          },
        },
        include: {
          event: true,
          RoomingListBooking: {
            include: {
              roomingList: true,
            },
          },
        },
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(bookingId: string, updateBookingDto: UpdateBookingDto) {
    await this.findOne(bookingId)
    try {
      return this.prisma.booking.update({
        where: { bookingId },
        data: updateBookingDto,
        include: {
          event: true,
          RoomingListBooking: {
            include: {
              roomingList: true,
            },
          },
        },
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove(bookingId: string) {
    await this.findOne(bookingId)
    return this.prisma.booking.delete({
      where: { bookingId },
      include: {
        event: true,
        RoomingListBooking: {
          include: {
            roomingList: true,
          },
        },
      },
    })
  }

  async findByEventId(eventId: string, includeRelations = false) {
    return this.prisma.booking.findMany({
      where: { eventId },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                roomingList: true,
              },
            },
          }
        : undefined,
    })
  }

  async findByHotelId(hotelId: string, includeRelations = false) {
    return this.prisma.booking.findMany({
      where: { hotelId },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                roomingList: true,
              },
            },
          }
        : undefined,
    })
  }

  async findByDateRange(startDate: Date, endDate: Date, includeRelations = false) {
    return this.prisma.booking.findMany({
      where: {
        OR: [
          {
            checkInDate: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            checkOutDate: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            AND: [{ checkInDate: { lte: startDate } }, { checkOutDate: { gte: endDate } }],
          },
        ],
      },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                roomingList: true,
              },
            },
          }
        : undefined,
    })
  }
  async findByRoomingListId(roomingListId: string, includeRelations = false) {
    return this.prisma.booking.findMany({
      where: {
        RoomingListBooking: {
          some: {
            roomingListId,
          },
        },
      },
      include: includeRelations
        ? {
            event: true,
            RoomingListBooking: {
              include: {
                roomingList: true,
              },
            },
          }
        : undefined,
    })
  }
}
