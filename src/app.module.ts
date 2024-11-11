import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { userModule } from './user/user.module';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    CommonModule,
    userModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
