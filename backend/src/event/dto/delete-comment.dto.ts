import { ApiProperty } from "@nestjs/swagger";

export class DeleteCommentDto {
  @ApiProperty()
  public uuid: string
}