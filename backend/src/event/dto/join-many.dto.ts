import { ApiProperty } from "@nestjs/swagger";

export class JoinManyDto {
    @ApiProperty()
    public eventUuid: string

    @ApiProperty()
    public usersUuid: string[]
}