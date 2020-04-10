import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';

import { async } from 'rxjs/internal/scheduler/async';
import { diskStorage, multer } from 'multer'
import { extname } from 'path';

@Module({
  imports:[MulterModule.register({
    
    //dest: './tmp',   
    limits:{
      fileSize: 30720
    },
    storage: diskStorage({
      destination: '../tmp',
      filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
      }
  }),
  fileFilter: (req,file,cb)=>{
    if(file.originalname.match(/\.png$/)){
      cb(null,true);
    }else{
      cb(new HttpException ("File format is not valid", HttpStatus.UNSUPPORTED_MEDIA_TYPE), false)
    }
  },


  })],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
