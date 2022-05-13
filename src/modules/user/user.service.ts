import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as Bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import configs from '@/configs';
import { UserDocument } from '@/schemas/user.schema';

import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  config = configs();
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    //
  }

  async create(createUserInput: CreateUserInput) {
    const isExist = await this.findByEmail(createUserInput.email);
    if (isExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userModel.create({
      ...createUserInput,
      password: await Bcrypt.hash(
        createUserInput.password,
        this.config.hash.saltRounds,
      ),
    });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findAll() {
    return this.userModel.find({});
  }

  findOne(_id: string) {
    return this.userModel.findOne({ _id });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const isExist = await this.findOne(id);
    if (!isExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User is not exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserInput).exec();
  }

  async remove(id: string) {
    await this.userModel.remove({ _id: id });
    return {
      _id: id,
    };
  }

  async authenticate(loginInput: LoginInput): Promise<LoginOutput> {
    const user = await this.findByEmail(loginInput.username);
    if (!user)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User is not exists',
        },
        HttpStatus.UNAUTHORIZED,
      );

    const isValid = await Bcrypt.compare(loginInput.password, user.password);
    if (!isValid)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password is not correct',
        },
        HttpStatus.UNAUTHORIZED,
      );

    return {
      token: this.jwtService.sign({
        _id: user._id,
        role: user.role,
      }),
    };
  }
}
