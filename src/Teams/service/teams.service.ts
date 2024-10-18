import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from '../entity/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly _teamRepository: Model<Team>,
  ) {}
  async createTeam(teamName: string): Promise<null> {
    const validateTeam = await this._teamRepository.findOne({
      where: { teamName },
    });
    if (!validateTeam) {
      const newTeam = await this._teamRepository.create(teamName);
      await newTeam.save();
      return null;
    }
    throw new Error('Team already exists');
  }
  async addUsersOnTeam(usersIds: number[], teamName: string): Promise<null> {
    // const usersObj = [];
    const team = await this._teamRepository.findOne({ where: { teamName } });
    if (!team) {
      throw new Error('Team not found, check team name');
    }
    // usersIds.map(async (id: number) => {
    //   const user = await this._userRepository.findById(id);
    //   usersObj.push(user);
    // });
    team.members.push(...usersIds);
    return null;
  }
  async deleteTeamMember(userIds: number[], teamName: string): Promise<void> {
    const validateTeam = await this._teamRepository.findOne({
      where: { teamName },
    });
    if (!validateTeam) {
      throw new Error('Team not found, check team name');
    }
    userIds.map((userId: number) => {
      const idx = validateTeam.members.indexOf(userId);
      if (idx > -1) {
        validateTeam.members.splice(idx, 1);
      }
    });
  }
  async deleteTeam(teamName: string): Promise<null> {
    const team = await this._teamRepository.findOne({ where: { teamName } });
    if (team || team.members.length === 0) {
      await this._teamRepository.deleteOne({ where: { teamName } });
    }
    throw new Error('Team not found or not empty');
  }
  async updateTeamName(teamName: string, id: number): Promise<Team> {
    return this._teamRepository.findByIdAndUpdate(id, {
      $set: { teamName },
    });
  }
}
