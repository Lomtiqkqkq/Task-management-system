import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TeamsService } from '../service/teams.service';

import { TeamMemberDTO } from '../dto/team.member.dto';
import { CreateTeamDto } from '../dto/create.team.dto';
import { RolesMiddleware } from '../../middleware/roles.middleware';

@UseGuards(RolesMiddleware)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('/create')
  createTeam(@Body() teamName: CreateTeamDto) {
    return this.teamsService.createTeam(teamName);
  }

  @Post('/add')
  addTeamMembers(@Body() teamDTO: TeamMemberDTO) {
    return this.teamsService.addUsersOnTeam(teamDTO);
  }

  @Post('/remove')
  removeTeamMembers(@Body() teamDTO: TeamMemberDTO) {
    return this.teamsService.deleteTeamMember(teamDTO);
  }

  @Post('/delete/:teamName')
  deleteTeam(@Param('teamName') teamName: string) {
    return this.teamsService.deleteTeam(teamName);
  }

  @Post('/update/:id')
  updateTeam(@Param('id') id: string, @Param('teamName') teamName: string) {
    return this.teamsService.updateTeamName(teamName, id);
  }
}
