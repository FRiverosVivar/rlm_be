import { Module } from '@nestjs/common'
import { RoomingListsController } from './rooming_lists.controller'
import { RoomingListsService } from './rooming_lists.service'
import { PrismaService } from '@/utils/prisma.service'

@Module({
  controllers: [RoomingListsController],
  providers: [RoomingListsService, PrismaService],
})
export class RoomingListsModule {}
