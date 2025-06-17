import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { User } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    const user: User = req.user;
    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
