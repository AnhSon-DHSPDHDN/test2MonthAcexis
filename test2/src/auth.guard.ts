import { 
  CanActivate, 
  ExecutionContext, 
  Injectable 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let check = null;
    if(req.headers && req.headers.authorization) {
      let token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 's3cr3t', (err, decode) => {
        if(err){
          check = false;
        }else{
          check = true;
          req.decode = decode.authorID;
        }
      });
      return check;
    }
    return false;
  }
}
