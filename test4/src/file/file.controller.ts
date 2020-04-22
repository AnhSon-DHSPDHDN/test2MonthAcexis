import { 
    Controller, 
    Post, 
    UseInterceptors, 
    UploadedFile, 
    Res, 
    Get, 
    Query, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as FileType from 'file-type';
import * as fs from 'fs';

@Controller('file')
export class FileController {
    @Get('download')
    download(@Res() res,@Query() query){
        let str = '..' || '%2e%2e' || '%252e' || '%255c';
        if( (query.id).lastIndexOf(str) !== -1 ){
            return res.sendStatus(400);
        }
        let imageID = query.id;
        return res.download('./tmp/'+imageID)
    }


    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file')
    )
    async uploadFile(@UploadedFile() file, @Res() res){
        const fileType = await FileType.fromFile(file.path);
        if(!fileType){
            fs.unlink(`./${file.path}`, (err) => {
                if(err) throw err;
            })
            return res.sendStatus(415);
        }
        if( fileType.ext !== 'png' || fileType.mime !== 'image/png' ){
            fs.unlink(`./${file.path}`, (err) => {
                if(err) throw err;
            })
            return res.sendStatus(415);
        }
        return res.json(
            {
                id: file.filename,
                originalname: file.originalname,
                size: file.size
            }
        )
    }
}
