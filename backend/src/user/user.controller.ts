import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { AuthGuard, Roles } from "src/auth/guards/auth.guard"
import { ChangeDto } from "./dto/change.dto"
import { DeleteDto } from "./dto/delete.dto"
import { DeleteManyDto } from "./dto/delete-many.dto"
import { ApiHeader, ApiTags } from "@nestjs/swagger"
import { CreateDto } from "./dto/create.dto"

@ApiTags('user')
@ApiHeader({ name: 'authorization' })
@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}


  @Get('all')
  @UseGuards(AuthGuard)
  public getAll() {
    return this.userService.getAll()
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  public getOne(@Param('uuid') uuid: string) {
    return this.userService.getOne(uuid)
  }

  @Post('create')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public create(@Body() body: CreateDto) {
    return this.userService.create(body)
  }


  @Put('change')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public change(@Body() body: ChangeDto) {
    return this.userService.change(body)
  }

  @Delete('delete')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public delete(@Body() body: DeleteDto) {
    return this.userService.delete(body.uuid)
  }

  @Delete('delete-many')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public deleteMany(@Body() body: DeleteManyDto) {
    return this.userService.deleteMany(body.uuids)
  }

  @Get('roles')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public roles() {
    return this.userService.roles()
  }
}
