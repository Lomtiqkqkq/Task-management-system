import { Controller, Post } from '@nestjs/common';
import { TeamsService } from '../service/teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post('/create')
  createTeam() {}
  @Post('/add')
  addTeamMembers() {}
  @Post('/remove')
  removeTeamMembers() {}
  @Post('/delete')
  deleteTeam() {}
  @Post('/update')
  updateTeam() {}
}
