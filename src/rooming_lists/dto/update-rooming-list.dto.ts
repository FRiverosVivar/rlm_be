import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateRoomingListDto } from './create-rooming-list.dto'

export class UpdateRoomingListDto extends OmitType(PartialType(CreateRoomingListDto), ['roomingListId']) {}
