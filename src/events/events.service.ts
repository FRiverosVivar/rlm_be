import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/utils/prisma.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(includeRelations = false) {
    return this.prisma.crewfareEvent.findMany({
      include: includeRelations ? { roomingList: true, booking: true } : undefined,
    })
  }

  async findOne(id: string, includeRelations = false) {
    const event = await this.prisma.crewfareEvent.findUnique({
      where: { id },
      include: includeRelations ? { roomingList: true, booking: true } : undefined,
    })
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)
    return event
  }

  async create(createEventDto: CreateEventDto) {
    return this.prisma.crewfareEvent.create({ data: createEventDto })
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id)
    return this.prisma.crewfareEvent.update({ where: { id }, data: updateEventDto })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.crewfareEvent.delete({ where: { id } })
  }
}
