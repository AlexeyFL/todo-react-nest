import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { BackendValidation } from 'src/shared/pipes/backendValidation';
import { IUser } from 'src/types/user';
import { IUserResponse } from 'src/types/userResponse';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users/register')
  @UsePipes(new BackendValidation())
  async register(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.createUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidation())
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.createUserResponse(user);
  }

  @Get('user')
  @UsePipes(new BackendValidation())
  @UseGuards(AuthGuard)
  async getUser(@User() user: UserEntity): Promise<IUserResponse> {
    return this.userService.createUserResponse(user);
  }
}
