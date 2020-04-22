import { 
    Controller,
    Get, 
    Param 
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get(':id')
    getUserID(@Param() param): string {
        return this.userService.getUserWithID(param.id);
    }
}
