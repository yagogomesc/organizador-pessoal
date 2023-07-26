import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt.constants';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PasswordService } from './password.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository, PasswordService],
})
export class UserModule {}
