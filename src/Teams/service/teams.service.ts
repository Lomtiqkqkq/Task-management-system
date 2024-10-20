import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from '../entity/team.entity';
import { TeamMemberDTO } from '../dto/team.member.dto';
import { ServiceError } from '../../exceptions/service.error';
import { CreateTeamDto } from '../dto/create.team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly _teamRepository: Model<Team>,
  ) {}
  async createTeam(teamName: CreateTeamDto): Promise<Team> {
    const validateTeam = await this._teamRepository
      .findOne({
        teamName: teamName.teamName,
      })
      .exec();
    if (validateTeam) {
      throw new ServiceError('Team already exists');
    }
    const newTeam = await this._teamRepository.create(teamName);
    await newTeam.save();
    return newTeam;
  }
  async addUsersOnTeam(addTeamMembersDTO: TeamMemberDTO): Promise<Team> {
    // const usersObj = [];
    const team = await this._teamRepository
      .findOne({
        teamName: addTeamMembersDTO.teamName,
      })
      .exec();
    if (!team) {
      throw new ServiceError('Team not found, check team name');
    }
    // usersIds.map(async (id: number) => {
    //   const user = await this._userRepository.findById(id);
    //   usersObj.push(user);
    // });
    team.membersId.push(...addTeamMembersDTO.userIds);
    return team;
  }
  async deleteTeamMember(removeTeamMembersDTO: TeamMemberDTO): Promise<void> {
    const validateTeam = await this._teamRepository.findOne({
      teamName: removeTeamMembersDTO.teamName,
    });
    if (!validateTeam) {
      throw new ServiceError('Team not found, check team name');
    }
    removeTeamMembersDTO.userIds.map((userId: string) => {
      const idx = validateTeam.membersId.indexOf(userId);
      if (idx > -1) {
        validateTeam.membersId.splice(idx, 1);
      }
    });
  }
  async deleteTeam(teamName: string): Promise<null> {
    const team = await this._teamRepository.findOne({ teamName: teamName });
    if (team || team.membersId.length === 0) {
      await this._teamRepository.deleteOne({ teamName: teamName });
    }
    throw new ServiceError('Team not found or not empty');
  }
  async updateTeamName(teamName: string, id: string): Promise<Team> {
    return this._teamRepository.findByIdAndUpdate(id, {
      $set: { teamName },
    });
  }
}
