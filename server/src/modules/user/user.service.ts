import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ICreateUserResponse } from './dtos/createUserResponse.dto';
import { createUserType } from './dtos/zod/createUserType.dto';
import { UserRepository } from './user.repository';
import { PasswordService } from './password.service';
import { loginUserType } from './dtos/zod/loginUserType.dto';
import { JwtService } from '@nestjs/jwt';
import { ILoginUserResponse } from './dtos/loginUserResponse.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: createUserType): Promise<ICreateUserResponse> {
    const emailAlreadyInUse = await this.userRepository.getUserByEmail(email);

    if (emailAlreadyInUse) {
      throw new ConflictException('Email já em uso.');
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const user = await this.userRepository.createUser({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }

  async loginUser({
    email,
    password,
  }: loginUserType): Promise<ILoginUserResponse> {
    const emailIsValid = await this.userRepository.getUserByEmail(email);

    if (!emailIsValid) {
      throw new UnauthorizedException(
        'Credenciais inválidas. Verifique o email e a senha.',
      );
    }

    const passwordIsValid = await this.passwordService.comparePassword(
      password,
      emailIsValid.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException(
        'Credenciais inválidas. Verifique o email e a senha.',
      );
    }

    const payload = { sub: emailIsValid.id, username: emailIsValid.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
