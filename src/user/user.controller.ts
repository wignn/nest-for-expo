
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, userFindResponse, UserLoginResponse, UserResponse } from 'src/models/user.model';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('/api/users')
export class UserController {
  constructor(private UserService: UserService) { }

  //creata a new user
  @HttpCode(200)
  @Post()
  async CreateUser(@Body() request: CreateUserRequest): Promise<UserResponse> {
    return this.UserService.createUser(request);
  }
  //login user
  @HttpCode(200)
  @Patch()
  async Login(@Body() request: LoginUserRequest): Promise<UserLoginResponse> {
    return this.UserService.login(request);
  }

  //get user by query
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get(':query')
  async GetUser(@Param('query') query: string): Promise<userFindResponse[]> {
    console.log(query);
    return this.UserService.findByQuery(query);
  }

  //get all users
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get()
  async GetAllUsers(request): Promise<userFindResponse[]> {
    return this.UserService.findALl();
  }

  //update user
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Put(':id')
  async UpdateUser(@Param('id') id: string, @Body() request: UpdateUserRequest): Promise<UserResponse> {
    return this.UserService.update(id, request);
  }

  //delete user
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Delete(':id')
  async DeleteUser(@Param('id') id: string): Promise<boolean> {
    return this.UserService.Delete(id);
  }
}
