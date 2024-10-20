import { Module } from '@nestjs/common';
import { TeamsController } from './controller/teams.controller';
import { TeamsService } from './service/teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entity/team.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
