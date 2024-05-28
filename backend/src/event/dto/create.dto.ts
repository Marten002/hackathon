import { ApiProperty } from "@nestjs/swagger"

export class CreateDto {
  @ApiProperty()
  public title: string

  @ApiProperty()
  public description: string

  @ApiProperty()
  public isPrivate: boolean

  @ApiProperty()
  public tags: string[]

  @ApiProperty()
  public startDate: number

  @ApiProperty()
  public endDate: number
}