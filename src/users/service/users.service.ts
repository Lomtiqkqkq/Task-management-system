import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entity/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private _userRepository: Model<User>) {}
  async createUser() {}
  async getAllUsers(): Promise<User[]> {
    return this._userRepository.find();
  }
  async getUserById(id: string): Promise<any> {}
}
