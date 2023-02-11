import {
  Controller,
  Bind,
  Request,
  Post,
  UseGuards,
  Dependencies,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@Dependencies(JwtService)
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(jwtService) {
    this.jwtService = jwtService;
  }
  @Post('/login')
  @Bind(Request())
  async login({ user }) {
    return { accessToken: this.jwtService.sign(user) };
  }
}
