import { Controller, Post, HttpCode, Body, Res, Req } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService){}
    @Post('register')
    register(@Body() req, @Res() res){
        let users=this.userService.getAllUsers();
        let checkUser=users.find(user=>user.username==req.username);
        if(checkUser==undefined){
            this.userService.registerUser(req);
            res.sendStatus(204);
        }else res.sendStatus(409);
    }
    @Post('login')
    login(@Body() body, @Req() req, @Res() res){
        const bcrypt=require('bcrypt');
        let users=this.userService.getAllUsers();
        let userName=body.username;
        let passWord=body.password;
        let checkUser=users.find(user=>{
            if(user.username==userName&&bcrypt.compareSync(passWord,user.password)){
                return user;
            }
        });
        if(checkUser!=undefined){
            let jwt=require('jsonwebtoken');
            let token=jwt.sign({userID:'phuong.hau'},'s3cr3t',{algorithm:'HS256', expiresIn: '3h'});
            res.json({token:token});
        }else res.send('unvalid username or password');
    }
}
