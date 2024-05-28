import { ApiProperty } from "@nestjs/swagger"

export class SignUpDto {
  @ApiProperty()
  public email: string

  @ApiProperty()
  public password: string

  @ApiProperty()
  public username: string
}