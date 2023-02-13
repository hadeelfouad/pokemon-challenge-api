import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Injectable()
@Dependencies(PrismaService)
export class UserService {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  findUnique(email, password) {
    return this.prismaService.user.findFirst({ where: { email, password } });
  }
}
