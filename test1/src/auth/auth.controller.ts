import { 
    Controller, 
    Post, 
    Body, 
    Res,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService){}
    @Post('register')
    register(@Body() req, @Res() res){
        let users = this.userService.getAllUsers();
        let checkUser = users.find(user => user.username === req.username);
        if(checkUser === undefined){
            this.userService.registerUser(req);
            res.sendStatus(204);
        }else res.sendStatus(409);
    }
    @Post('login')
    login(@Body() body, @Res() res) {
        let users = this.userService.getAllUsers();
        let userName = body.username;
        let passWord = body.password;
        let checkUser = users.find(user => {
            if(user.username === userName 
               && bcrypt.compareSync(passWord, user.password)) {
                return user;
            }
        });
        if(checkUser !== undefined) {
            let token = jwt.sign({userID: userName}, 's3cr3t', {algorithm:'HS256', expiresIn: '3h'});
            res.json(
                {
                    token: token
                }
            );
        }else res.send('unvalid username or password');
    }
}
