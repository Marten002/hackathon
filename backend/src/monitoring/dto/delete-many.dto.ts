import { ApiProperty } from "@nestjs/swagger";

export class DeleteManyDto {
  @ApiProperty()
  public uuids: string[]
}