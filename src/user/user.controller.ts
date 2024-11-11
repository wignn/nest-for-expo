
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
  Request,
  UseGuards,
} from '@nestjs/common';
;
import { JwtGuard } from './guards/jwt.guard';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { CreateUserRequest, CreateUserResponse, LoginUserRequest, UserResponse } from 'src/models/user.model';

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
}
