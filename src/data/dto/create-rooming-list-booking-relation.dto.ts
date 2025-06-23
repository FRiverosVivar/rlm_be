import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class RoomingListBookingRelationDto {
  @IsString()
  @IsUUID()
  roomingListId: string

  @IsString()
  @IsUUID()
  bookingId: string
}

export class CreateRoomingListBookingRelationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomingListBookingRelationDto)
  relations: RoomingListBookingRelationDto[]
}
