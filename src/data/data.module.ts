import { Module } from '@nestjs/common'
import { DataService } from './data.service'
import { DataController } from './data.controller'
import { PrismaService } from '@/utils/prisma.service'

@Module({
  controllers: [DataController],
  providers: [DataService, PrismaService],
  exports: [DataService],
})
export class DataModule {}
