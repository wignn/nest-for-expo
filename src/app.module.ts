import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { userModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CommonModule,
    userModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, JwtService],
})
export class AppModule { }
