import { NextFunction, Response, Request } from 'express';

import DB from '@/databases';
import { UnauthorizedHttpException } from '@/exceptions/HttpException';

class RoleAuthorization {
  public role = DB.Role;

  public roleAuthorization = (requiredRole: string[], message: string): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        if (req.user && req.user.role_id) {
          const role = await this.role.findOne({
            where: {
              id: req.user.role_id,
            },
          });
          if (requiredRole.includes(role.role_name)) {
            return next();
          } else {
            return next(new UnauthorizedHttpException(message));
          }
        } else {
          return next(new UnauthorizedHttpException(message));
        }
      } catch (error) {
        return next(error);
      }
    };
  };
}

export default RoleAuthorization;
