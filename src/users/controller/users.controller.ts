import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { RolesMiddleware } from '../../middleware/roles.middleware';

@UseGuards(RolesMiddleware)
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this._usersService.createUser(createUserDto);
  }
  @Post('/update/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this._usersService.updateUser(updateUserDto, id);
  }
  @Post('/delete/:id')
  deleteUser(@Param('id') id: number) {
    return this._usersService.deleteUser(id);
  }
}
