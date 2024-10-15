import { message } from '@utils/message';

export class HttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.errorCode = statusCode;
    this.message = message;
  }
}

export class NotFoundHttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor(message: string) {
    super(message);
    this.errorCode = 404; // Not found
    this.message = message;
  }
}

export class BadRequestHttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor(message: string) {
    super(message);
    this.errorCode = 400; // Bad Request
    this.message = message;
  }
}

export class ConflictHttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor(message: string) {
    super(message);
    this.errorCode = 409;
    this.message = message;
  }
}

export class UnprocessableHttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor(message: string) {
    super(message);
    this.errorCode = 422;
    this.message = message;
  }
}

export class PermissionHttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor() {
    super();
    this.errorCode = 403; // Forbidden
    this.message = message.general.permissionError;
  }
}

export class UnauthorizedHttpException extends Error {
  public errorCode: number;
  public message: string;

  constructor(message: string) {
    super(message);
    this.errorCode = 401; //Unauthorized
    this.message = message;
  }
}
