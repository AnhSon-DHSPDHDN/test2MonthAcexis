import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';

@Module({
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService]
})
export class AuthorModule {}
