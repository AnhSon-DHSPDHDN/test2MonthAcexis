import { 
    Controller, 
    Get, 
    UseGuards, 
    Req 
} from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';

@Controller('product')
export class ProductController {
    @Get('public')
    getPublic(){
        return `public content`;
    }
    @Get('protected')
    @UseGuards(AuthGuard)
    getProtected(@Req() req) {
        return `private content of ${req.userID}`;
    }
}
