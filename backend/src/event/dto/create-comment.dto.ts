import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
  @ApiProperty()
  public message: string

  @ApiProperty()
  public eventUuid: string
}