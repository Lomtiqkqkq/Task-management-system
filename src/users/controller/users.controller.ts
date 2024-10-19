import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { Response } from 'express';
import { UpdateUserDto } from '../dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const create = this._usersService.createUser(createUserDto);
      res
        .status(HttpStatus.CREATED)
        .send('user created successfully.' + create);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
  @Post('/update/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const upd = this._usersService.updateUser(updateUserDto, id);
      res.status(HttpStatus.OK).send('user updated successfully.' + upd);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
  @Post('/delete/:id')
  deleteUser(@Param('id') id: number, @Res() res: Response) {
    try {
      this._usersService.deleteUser(id);
      res.status(HttpStatus.OK).send('user deleted successfully.');
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
