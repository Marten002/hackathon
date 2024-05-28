import { ApiProperty } from "@nestjs/swagger"

export class ChangeDto {
  @ApiProperty()
  public uuid: string

  @ApiProperty()
  public username: string

  @ApiProperty()
  public surname: string

  @ApiProperty()
  public patronymic: string

  @ApiProperty()
  public password: string

  @ApiProperty()
  public role: string
}