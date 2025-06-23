import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from './events/events.module'
import { BookingsModule } from './bookings/bookings.module'
import { RoomingListsModule } from './rooming_lists/rooming_lists.module'
import { DataModule } from './data/data.module'
import { JwtAuthGuard } from './auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [EventsModule, BookingsModule, RoomingListsModule, DataModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
