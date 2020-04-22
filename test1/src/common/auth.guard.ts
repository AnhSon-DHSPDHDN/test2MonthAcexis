import { 
  CanActivate, 
  ExecutionContext, 
  Injectable 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    let check = null;
    if(req.headers && req.headers.authorization){
      let token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 's3cr3t', (err, decode) => {
        if(err) {
          check = false;
        }
        else {
          req.userID = decode.userID;
          check = true;
        }
      });
      return check;
    }
    else {
      return false;
    }
  }
}
