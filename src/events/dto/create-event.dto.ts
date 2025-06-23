import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateEventDto {
  @ApiProperty({ description: 'ID del evento' })
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({ description: 'Nombre del evento' })
  @IsString()
  @IsNotEmpty()
  name: string
}
