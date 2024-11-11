import { JwtService } from '@nestjs/jwt';
import { ValidationService } from './../common/validate.service';
import { PrismaService } from '../common/prisma.service';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest, CreateUserResponse, LoginUserRequest, userFindResponse, UserResponse } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    this.logger.info(`creating user`)
    const CreateUserRequest: CreateUserRequest = this.validationService.validate(UserValidation.CREATE, request);
    const totalUserWithSameUsername = await this.prismaService.user.count({
      where: {
        username: CreateUserRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new HttpException('Username already exists', 400);
    }

    CreateUserRequest.password = await bcrypt.hash(CreateUserRequest.password, 10);

    const user = await this.prismaService.user.create({
      data: CreateUserRequest,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    };

  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.info(`Logging in user ${JSON.stringify(request)}`);
    const loginRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findFirst({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new HttpException('Invalid username or password', 400);
    }

    const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid username or password', 400);
    }


    const payload = {
      username: user.username,
      sub: {
        name: user.name,
      },
    };


    return {
      id: user.id,
      username: user.username,
      name: user.name,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          privateKey: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          privateKey: process.env.JWT_REFRES_TOKEN,
        }),
      }
    }
  }

  async findByQuery(query: string): Promise<userFindResponse[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [
          { id: query },
          { username: { contains: query } },
          { email: query },
          { name: { contains: query } },
        ],
      },
    });

    if (!users || users.length === 0) {
      throw new HttpException('User not found', 400);
    }

    return users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      backgroundPicture: user.backgroundPicture,
      createdAt: user.createdAt.toISOString(),
    }));
  }

  async findALl(): Promise<userFindResponse[]> {
    {
      const users = await this.prismaService.user.findMany();
      return users.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        backgroundPicture: user.backgroundPicture,
        createdAt: user.createdAt.toISOString(),
      }));
    }
  }
}
