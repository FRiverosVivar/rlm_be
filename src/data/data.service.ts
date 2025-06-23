import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/utils/prisma.service'
import { RoomingListBookingRelationDto } from './dto/create-rooming-list-booking-relation.dto'

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async createRoomingListBookingRelations(relations: RoomingListBookingRelationDto[]) {
    if (!relations || relations.length === 0) {
      throw new BadRequestException('Relations array cannot be empty')
    }

    // Validate that all rooming lists and bookings exist
    const roomingListIds = [...new Set(relations.map((r) => r.roomingListId))]
    const bookingIds = [...new Set(relations.map((r) => r.bookingId))]

    // Check if all rooming lists exist
    const existingRoomingLists = await this.prisma.roomingList.findMany({
      where: {
        roomingListId: {
          in: roomingListIds,
        },
      },
      select: { roomingListId: true },
    })

    const existingRoomingListIds = existingRoomingLists.map((r) => r.roomingListId)
    const missingRoomingListIds = roomingListIds.filter((id) => !existingRoomingListIds.includes(id))

    if (missingRoomingListIds.length > 0) {
      throw new NotFoundException(`Rooming lists not found: ${missingRoomingListIds.join(', ')}`)
    }

    // Check if all bookings exist
    const existingBookings = await this.prisma.booking.findMany({
      where: {
        bookingId: {
          in: bookingIds,
        },
      },
      select: { bookingId: true },
    })

    const existingBookingIds = existingBookings.map((b) => b.bookingId)
    const missingBookingIds = bookingIds.filter((id) => !existingBookingIds.includes(id))

    if (missingBookingIds.length > 0) {
      throw new NotFoundException(`Bookings not found: ${missingBookingIds.join(', ')}`)
    }

    // Check for existing relations to avoid duplicates
    const existingRelations = await this.prisma.roomingListBooking.findMany({
      where: {
        OR: relations.map((r) => ({
          roomingListId: r.roomingListId,
          bookingId: r.bookingId,
        })),
      },
      select: {
        roomingListId: true,
        bookingId: true,
      },
    })

    const existingRelationKeys = existingRelations.map((r) => `${r.roomingListId}-${r.bookingId}`)
    const newRelations = relations.filter((r) => !existingRelationKeys.includes(`${r.roomingListId}-${r.bookingId}`))

    if (newRelations.length === 0) {
      return {
        message: 'All relations already exist',
        created: 0,
        existing: existingRelations.length,
      }
    }

    // Create new relations using individual create operations
    const createdRelations = []
    for (const relation of newRelations) {
      try {
        const created = await this.prisma.roomingListBooking.create({
          data: {
            roomingListId: relation.roomingListId,
            bookingId: relation.bookingId,
          } as any,
        })
        createdRelations.push(created)
      } catch (error) {
        // Skip if relation already exists (duplicate key error)
        if (error.code !== 'P2002') {
          throw error
        }
      }
    }

    return {
      message: 'Relations created successfully',
      created: createdRelations.length,
      existing: existingRelations.length,
      total: relations.length,
    }
  }

  async getRoomingListBookings(roomingListId: string) {
    const roomingList = await this.prisma.roomingList.findUnique({
      where: { roomingListId },
      include: {
        RoomingListBooking: {
          include: {
            booking: true,
          },
        },
      },
    })

    if (!roomingList) {
      throw new NotFoundException(`Rooming list with ID ${roomingListId} not found`)
    }

    return roomingList
  }

  async getBookingRoomingLists(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingId },
      include: {
        RoomingListBooking: {
          include: {
            roomingList: true,
          },
        },
      },
    })

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`)
    }

    return booking
  }

  async removeRoomingListBookingRelation(roomingListId: string, bookingId: string) {
    const relation = await this.prisma.roomingListBooking.findFirst({
      where: {
        roomingListId,
        bookingId,
      },
    })

    if (!relation) {
      throw new NotFoundException('Relation not found')
    }

    await this.prisma.roomingListBooking.delete({
      where: { id: relation.id },
    })

    return { message: 'Relation removed successfully' }
  }

  async removeAllRoomingListBookingRelations(roomingListId: string) {
    const deletedCount = await this.prisma.roomingListBooking.deleteMany({
      where: { roomingListId },
    })

    return {
      message: 'All relations removed successfully',
      deletedCount: deletedCount.count,
    }
  }
}
