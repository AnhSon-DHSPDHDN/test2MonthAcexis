import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';

@Module({
  imports:[MulterModule.register({   
    limits:{
      fileSize: 30720
    },
    storage: diskStorage({
      destination: './tmp',
      filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    }),
  })],
  controllers: [FileController],
})
export class FileModule {}
