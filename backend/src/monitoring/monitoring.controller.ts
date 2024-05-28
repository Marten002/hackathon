import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthGuard, Roles } from "src/auth/guards/auth.guard"
import { ApiHeader, ApiTags } from "@nestjs/swagger"
import { MonitoringService } from "./monitoring.service"

@ApiTags('monitoring')
@ApiHeader({ name: 'authorization' })
@Controller('api/monitoring')
export class MonitoringController {
  constructor(
    private monitoringService: MonitoringService
  ) {}


  @Get('users-by-gender')
  @Roles('admin', 'analyst')
  @UseGuards(AuthGuard)
  public byGender() {
    return this.monitoringService.usersByGender()
  }

  @Get('events-by-tags')
  @Roles('admin', 'analyst')
  @UseGuards(AuthGuard)
  public eventsByTags() {
    return this.monitoringService.eventsByTags()
  }

  @Get('finished-events')
  @Roles('admin', 'analyst')
  @UseGuards(AuthGuard)
  public finishedEvents() {
    return this.monitoringService.finishedEvents()
  }

  @Get('participants-in-events')
  @Roles('admin', 'analyst')
  @UseGuards(AuthGuard)
  public participantsInEvents() {
    return this.monitoringService.participantsInEvents()
  }

  @Get('favorite-events')
  @Roles('admin', 'analyst')
  @UseGuards(AuthGuard)
  public favoriteEvents() {
    return this.monitoringService.favoriteEvents()
  }

  @Get('favorite-user')
  @Roles('admin', 'analyst')
  @UseGuards(AuthGuard)
  public favoriteUser() {
    return this.monitoringService.favoriteUser()
  }
}
