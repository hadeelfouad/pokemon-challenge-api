import { dissoc } from 'ramda';
import { Injectable, Dependencies } from '@nestjs/common';
import { UserService } from '../entities/users/users.service';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  async validateUser(email, password) {
    const user = await this.userService.findUnique(email, password);
    return user ? dissoc('password', user) : null;
  }
}
