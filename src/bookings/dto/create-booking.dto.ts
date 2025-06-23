import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsDateString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateBookingDto {
  @ApiProperty({
    description: 'Unique identifier for the booking',
    example: 'booking-12345',
  })
  @IsString()
  @IsNotEmpty()
  bookingId: string
  @ApiProperty({
    description: 'Hotel identifier where the booking is made',
    example: 'hotel-abc123',
  })
  @IsString()
  @IsNotEmpty()
  hotelId: string

  @ApiProperty({
    description: 'Event identifier associated with this booking',
    example: 'event-xyz789',
  })
  @IsString()
  @IsNotEmpty()
  eventId: string

  @ApiProperty({
    description: 'Name of the guest making the booking',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  guestName: string

  @ApiProperty({
    description: 'Phone number of the guest',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  guestPhoneNumber: string

  @ApiProperty({
    description: 'Check-in date for the booking',
    example: '2024-01-15T14:00:00.000Z',
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  @Type(() => Date)
  checkInDate: Date

  @ApiProperty({
    description: 'Check-out date for the booking',
    example: '2024-01-18T11:00:00.000Z',
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  @Type(() => Date)
  checkOutDate: Date
}
