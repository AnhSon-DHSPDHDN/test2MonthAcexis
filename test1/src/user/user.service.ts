import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    private users: any[] = [
        {
            name:'admin',
            username:'admin',
            password:'admin',
            _id:'1'
        }
    ];
    getAllUsers() {
        return this.users;
    }
    getUserWithID(id: string) {
        let user = this.users.find(user => user.username === id)
        if(!user) {
            throw new Error(`user is not found`);
        }
        return user;
    }
    registerUser(body) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(body.password, salt);
        body.password = hash;
        body._id = body.username;
        return this.users.push(body);
    }
}
