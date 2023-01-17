import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/guard/auth/jwt-auth.guard';
import { Express } from 'express';
import { AbstractUserService } from 'src/app/interface/user';
import { User } from 'src/app/model/user/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: AbstractUserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() express: Express): Promise<User | null> {
    return await this.userService.getUser(express);
  }
}
