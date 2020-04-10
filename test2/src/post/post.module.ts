import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { AuthorModule } from 'src/author/author.module';

@Module({
  providers: [PostService, PostResolver],
  imports: [AuthorModule]
})
export class PostModule {}
