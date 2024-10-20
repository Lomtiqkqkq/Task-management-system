import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entity/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { ServiceError } from '../../exceptions/service.error';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private _userRepository: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const validateUser = await this._userRepository
      .findOne({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      })
      .exec();
    if (!validateUser) {
      const newUser = await this._userRepository.create(createUserDto);
      await newUser.save();
      return newUser;
    }
    throw new ServiceError('User already exists');
  }
  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<User> {
    const user = await this._userRepository.findByIdAndUpdate(id, {
      $set: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      },
    });
    if (!user) {
      throw new ServiceError('User not found, try again later');
    }
    return user;
  }
  async deleteUser(id: number): Promise<null> {
    const user = await this._userRepository.findByIdAndDelete(id);
    if (!user) {
      throw new ServiceError('User not found, try again later');
    }
    return null;
  }
}
