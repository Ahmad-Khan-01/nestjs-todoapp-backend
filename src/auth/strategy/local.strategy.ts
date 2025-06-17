import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt'; // npm i bcrypt
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email', // ✅ correct option name
      passwordField: 'password', // ✅ correct option name
    });
  }

  // If you hash passwords, return `Promise<Omit<User, "password">>` instead
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(`User not found: ${email}`);
    }

    // For plaintext passwords (not recommended) use: if (user.password !== password)
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return user; // strip password before returning if you expose this outside the guard
  }
}
