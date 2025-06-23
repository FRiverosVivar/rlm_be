import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator'

export enum RoomingListStatusEnum {
  Cancelled = 'Cancelled',
  Closed = 'Closed',
  Active = 'Active',
}

export enum AgreementTypeEnum {
  Leisure = 'Leisure',
  Staff = 'Staff',
  Artist = 'Artist',
}

export class CreateRoomingListDto {
  @ApiProperty({ description: 'ID de la lista de alojamiento' })
  @IsString()
  @IsNotEmpty()
  roomingListId: string

  @ApiProperty({ description: 'ID del evento' })
  @IsString()
  @IsNotEmpty()
  eventId: string

  @ApiProperty({ description: 'ID del hotel' })
  @IsString()
  @IsNotEmpty()
  hotelId: string

  @ApiProperty({ description: 'Nombre del RFP' })
  @IsString()
  @IsNotEmpty()
  rfpName: string

  @ApiProperty({ description: 'Fecha de corte' })
  @IsDateString()
  cutOffDate: string

  @ApiProperty({ description: 'Estado de la lista de alojamiento', enum: RoomingListStatusEnum })
  @IsEnum(RoomingListStatusEnum)
  status: RoomingListStatusEnum

  @ApiProperty({ description: 'Tipo de acuerdo', enum: AgreementTypeEnum })
  @IsEnum(AgreementTypeEnum)
  agreement_type: AgreementTypeEnum
}
