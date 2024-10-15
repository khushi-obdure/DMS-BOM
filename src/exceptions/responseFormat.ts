import { Response } from 'express';

export class ResponseFormat {
  public response = (res: Response, success: boolean, status: number, data: object, message: string) => {
    return res.status(status).send({
      errorCode: !success ? status : null,
      message: message,
      success: success,
      data: data,
    });
  };
}
