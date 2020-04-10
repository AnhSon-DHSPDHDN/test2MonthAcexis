import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from 'punycode';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req=context.switchToHttp().getRequest();
    const res=context.switchToHttp().getResponse();
    //const token=req && req.headers.authorization;
    let jwt=require('jsonwebtoken');
    let check;
    if(req.headers && req.headers.authorization){
      let token=req.headers.authorization.split(' ')[1];
      jwt.verify(token,'s3cr3t', (err,decode)=>{
        if(err){
          check=false;
        }else{
          req.userID=decode.userID;
          console.log(decode);
          check= true;
        }
      });
      return check;
    }else{
      return false;
    }
  }
}
