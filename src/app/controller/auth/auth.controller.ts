import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from 'src/app/dto/auth';
import { Request as Express } from 'express';
import {
  AbstractUserService,
  CreatedUserResponse,
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
    @Req() request: Express,
    @Body() body: RegisterUserDTO,
  ): Promise<CreatedUserResponse | null> {
    return await this.userService.create(body);
  }
}
