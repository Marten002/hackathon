import { ApiProperty } from "@nestjs/swagger";

export class DeleteDto {
  @ApiProperty()
  public uuid: string
}