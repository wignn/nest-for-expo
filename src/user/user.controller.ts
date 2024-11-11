
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserRequest, CreateUserResponse, LoginUserRequest, userFindResponse, UserResponse } from 'src/models/user.model';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('/api/users')
export class UserController {
  constructor(private UserService: UserService) { }


  @HttpCode(200)
  @Post()
  async CreateUser(@Body() request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.UserService.createUser(request);
  }

  @HttpCode(200)
  @Patch()
  async Login(@Body() request: LoginUserRequest): Promise<UserResponse> {
    return this.UserService.login(request);
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Get(':query')
  async GetUser(@Param('query') query: string): Promise<userFindResponse[]> {
    console.log(query);
    return this.UserService.findByQuery(query);
  }
}
