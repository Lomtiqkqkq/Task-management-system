import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { TeamsService } from '../service/teams.service';
import { Response } from 'express';
import { TeamMemberDTO } from '../dto/team.member.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post('/create')
  createTeam(@Param('teamName') teamName: string, @Res() res: Response) {
    try {
      const create = this.teamsService.createTeam(teamName);
      res.status(201).json(create);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
  @Post('/add/')
  addTeamMembers(@Body() teamDTO: TeamMemberDTO, @Res() res: Response) {
    try {
      const add = this.teamsService.addUsersOnTeam(teamDTO);
      res.status(HttpStatus.OK).send(add);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
  @Post('/remove')
  removeTeamMembers(@Body() teamDTO: TeamMemberDTO, @Res() res: Response) {
    try {
      const remove = this.teamsService.deleteTeamMember(teamDTO)
      res.status(HttpStatus.OK).send('user removed successfully.' + remove);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
  @Post('/delete/:teamName')
  deleteTeam(@Param('teamName') teamName: string, @Res() res: Response) {
    try {
      this.teamsService.deleteTeam(teamName);
      res.status(HttpStatus.OK).send('user deleted successfully.');
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
  @Post('/update/:id')
  updateTeam(@Param('id') id: number, @Res() res: Response, @Param('teamName') teamName: string) {
    try {
      this.teamsService.updateTeamName(teamName, id);
      res.status(HttpStatus.OK).send('team name updated successfully.');
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}
