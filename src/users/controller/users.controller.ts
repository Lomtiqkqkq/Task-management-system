import { Controller, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  @Post('/create')
  createUser() {}
  @Post('/update')
  updateUser() {}
  @Post('/delete')
  deleteUser() {}
}
