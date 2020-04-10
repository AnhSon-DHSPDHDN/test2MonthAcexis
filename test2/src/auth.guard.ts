import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorService } from './author/author.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authorService:AuthorService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx=GqlExecutionContext.create(context);
    const { req }=ctx.getContext();
    let jwt=require('jsonwebtoken');
    let check;
    //console.log(req.headers.authorization)
    if(req.headers && req.headers.authorization){
      let token=req.headers.authorization.split(' ')[1];
      //console.log(token)
      jwt.verify(token,'s3cr3t',(err,decode)=>{
        if(err){
          check=false;
        }else{
          check=true;
        }
      });
      return check;
    }
    return false;
  }
}
