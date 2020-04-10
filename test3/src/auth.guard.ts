import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let check;
    const ctx=GqlExecutionContext.create(context);
    const {req}=ctx.getContext();
    let jwt=require('jsonwebtoken');
    if(req.headers && req.headers.authorization){
      let token=req.headers.authorization.split(' ')[1];
      //console.log(token)
      jwt.verify(token,'sup3rs3cr3t',(err,decode)=>{
        if(err){
          check=false;
        }else{
          check=true;
          //console.log(decode);
        }
      });
      return check;
    }
    return false;
  }
}
