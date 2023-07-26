import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ZodExceptionFilter } from 'src/shared/filters/zod-exception.filter';
import { ICreateUserResponse } from './dtos/createUserResponse.dto';
import { ILoginUserResponse } from './dtos/loginUserResponse.dto';
import { createUserType } from './dtos/zod/createUserType.dto';
import { loginUserType } from './dtos/zod/loginUserType.dto';
import { createUserSchema } from './schemas/createUser.schema';
import { loginUserSchema } from './schemas/loginUser.schema';
import { UserService } from './user.service';

@Controller('users')
@UseFilters(ZodExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() userData: createUserType,
  ): Promise<ICreateUserResponse> {
    const validatedNewUser = createUserSchema.parse(userData);

    const user = await this.userService.createUser(validatedNewUser);

    return user;
  }

  @Post('login')
  async loginUser(
    @Body() loginData: loginUserType,
  ): Promise<ILoginUserResponse> {
    const validatedLoginData = loginUserSchema.parse(loginData);

    const userAccessToken = await this.userService.loginUser(
      validatedLoginData,
    );

    return userAccessToken;
  }
}
