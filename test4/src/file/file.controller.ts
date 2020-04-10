import { Controller, Post, UseInterceptors, UploadedFile, Res, Get, Query, UseGuards, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, multer } from 'multer'
import { extname } from 'path';
import { createWriteStream } from 'fs';

@Controller('file')
export class FileController {
    @Get('download')
    download(@Res() res,@Query() query, @Req() req){
        let str='..'||'%2e%2e'||'%252e'||'%255c';
        if((query.id).lastIndexOf(str)!=-1){
            return res.sendStatus(400);
        }
        let imageID=query.id;
        return res.download('../tmp/'+imageID)
    }


    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file')
    )
    uploadFile(@UploadedFile() file, @Res() res){
        /*let bufferJson=JSON.stringify(file.buffer);
        let bufferJSONOj=JSON.parse(bufferJson.toString())
        if(file.size<=30720&&file.originalname.split('.')[1]=='png'&&bufferJSONOj.data[0]==137&&bufferJSONOj.data[1]==80&&bufferJSONOj.data[2]==78&&bufferJSONOj.data[3]==71){
            
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            const fileName=`${randomName}${extname(file.originalname)}`; 
            console.log(fileName)
             const path='../tmp/'+fileName;
             let fileStream=createWriteStream(path);
             fileStream.write(file.buffer);
             fileStream.end();
            return res.json({
                id: file.filename,
                originalname: file.originalname,
                size: file.size
            })
        }
        return res.sendStatus(415);*/
        if(file.size<80){
            return res.sendStatus(415)
        }
        return res.json({
            id: file.filename,
            originalname: file.originalname,
            size: file.size
        })
    }
}
