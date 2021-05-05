import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
      super('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  