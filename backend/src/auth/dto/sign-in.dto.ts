import { ApiProperty } from "@nestjs/swagger"

export class SignInDto {
  @ApiProperty()
  public email: string
  
  @ApiProperty()
  public password: string
}