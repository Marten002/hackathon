import { ApiProperty } from '@nestjs/swagger';

export class SetLikeDto {
  @ApiProperty()
  public eventUuid: string
}