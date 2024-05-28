import { ApiProperty } from "@nestjs/swagger"

export class CreateDto {
  @ApiProperty()
  public username: string

  @ApiProperty()
  public email: string

  @ApiProperty()
  public role: string
}