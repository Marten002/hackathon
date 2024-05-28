import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common"
import { EventService } from "./event.service"
import { AuthGuard, Roles } from "src/auth/guards/auth.guard"
import { CreateDto } from "./dto/create.dto"
import { ChangeDto } from "./dto/change.dto"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { DeleteCommentDto } from "./dto/delete-comment.dto"
import { SetLikeDto } from "./dto/set-like.dto"
import { ApiHeaders, ApiTags } from "@nestjs/swagger"
import { JoinManyDto } from "./dto/join-many.dto"

@ApiTags('event')
@ApiHeaders([{ name: 'authorization' }])
@Controller('api/event')
export class EventController {
  constructor(
    private eventService: EventService
  ) {}


  @Get('all')
  @UseGuards(AuthGuard)
  public getAll() {
    return this.eventService.getAll()
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  public getOne(@Param('uuid') uuid: string) {
    return this.eventService.getOne(uuid)
  }

  @Post('create')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public create(@Body() body: CreateDto, @Req() request: any)  {
    return this.eventService.create(body, request)
  }

  @Put('change')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public change(@Body() body: ChangeDto)  {
    return this.eventService.change(body)
  }

  @Post('comment/create')
  @UseGuards(AuthGuard)
  public createComment(@Body() body: CreateCommentDto, @Req() request: any)  {
    return this.eventService.createComment(body, request)
  }

  @Delete('comment/delete')
  @UseGuards(AuthGuard)
  public deleteComment(@Body() body: DeleteCommentDto, @Req() request: any)  {
    return this.eventService.deleteComment(body, request)
  }

  @Post('like')
  @UseGuards(AuthGuard)
  public setLike(@Body() body: SetLikeDto, @Req() request: any)  {
    return this.eventService.like(body, request)
  }

  @Post('join')
  @UseGuards(AuthGuard)
  public join(@Body('eventUuid') uuid: string, @Req() request: any) {
    return this.eventService.join(uuid, request)
  }

  @Post('join-many')
  @Roles('admin')
  @UseGuards(AuthGuard)
  public joinMain(@Body() body: JoinManyDto) {
    return this.eventService.joinMany(body)
  }

  @Post('exit')
  @UseGuards(AuthGuard)
  public exit(@Body('eventUuid') uuid: string, @Req() request: any) {
    return this.eventService.exit(uuid, request)
  }
}
