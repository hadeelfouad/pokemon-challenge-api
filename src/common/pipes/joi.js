import { Injectable, BadRequestException } from '@nestjs/common';
@Injectable()
export class JoiValidationPipe {
  constructor(schema) {
    this.schema = schema;
  }

  transform(value, __) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return value;
  }
}
