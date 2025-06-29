import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateEventDto } from './create-event.dto'

export class UpdateEventDto extends OmitType(PartialType(CreateEventDto), ['id']) {}
