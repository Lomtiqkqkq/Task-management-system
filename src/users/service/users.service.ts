import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entity/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private _userRepository: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const validateUser = await this._userRepository.findOne({
      where: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      },
    });
    if (!validateUser) {
      const newUser = await this._userRepository.create(createUserDto);
      await newUser.save();
      return newUser;
    }
    throw new Error('User already exists');
  }
  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<null> {
    const user = await this._userRepository.findByIdAndUpdate(id, {
      $set: {
        firstName: updateUserDto?.firstName,
        lastName: updateUserDto?.lastName,
      },
    });
    if (!user) {
      throw new Error('User not found, try again later');
    }
    return null;
  }
  async deleteUser(id: number): Promise<null> {
    const user = await this._userRepository.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found, try again later');
    }
    return null;
  }
}
