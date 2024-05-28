import { ApiProperty } from "@nestjs/swagger"

export class ChangeDto {
  @ApiProperty()
  public uuid: string

  @ApiProperty()
  public title: string

  @ApiProperty()
  public tags: string[]

  @ApiProperty()
  public description: string

  @ApiProperty()
  public isPrivate: boolean

  @ApiProperty()
  public startDate: number

  @ApiProperty()
  public endDate: number
}