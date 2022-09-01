import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { IUserResponse } from 'src/types/userResponse';

import { config } from 'dotenv';
config();

Injectable();
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    const userByName = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (userByEmail || userByName) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();

    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
      select: ['id', 'username', 'email', 'password'],
    });

    if (!userByEmail) {
      throw new HttpException(
        'User with this email not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginUserDto.password,
      userByEmail.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Password are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete userByEmail.password;

    return userByEmail;
  }

  async findById(id: number): Promise<UserEntity> {
    const userById = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userById) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.NOT_FOUND,
      );
    }

    return userById;
  }

  generateJwt(user: UserEntity): string {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
    );
  }

  createUserResponse(user: UserEntity): IUserResponse {
    delete user.password;
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
