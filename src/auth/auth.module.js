import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../entities/users/users.module';
import { AuthController } from './auth.controller';
import { AuthStrategy } from './auth.strategy';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

const { jwtSecret } = authConstants;

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
