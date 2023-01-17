import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO, RegisterUserDTO } from 'src/app/dto/auth';
import {
  AbstractUserService,
  CreatedUserResponse,
  LoginUserResponse,
} from 'src/app/interface/user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: AbstractUserService) {}

  @Post('register')
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({
    status: 200,
    description: 'User account created',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing Required Fields - Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal error occured',
  })
  async create(
    @Body() registerUserDto: RegisterUserDTO,
  ): Promise<CreatedUserResponse | null> {
    return await this.userService.create(registerUserDto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing Required Fields - Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal error occured',
  })
  async login(@Body() loginUserDto: LoginUserDTO): Promise<LoginUserResponse> {
    return await this.userService.login(loginUserDto);
  }
}
