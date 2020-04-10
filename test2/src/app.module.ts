import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { PostModule } from './post/post.module';
import { AuthorModule } from './author/author.module';
@Module({
  imports: [ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions:{
        path: join(process.cwd(), 'src/graphql.ts')
      },
      context: ({ req,res }) => ({ req,res }),
      installSubscriptionHandlers: true,
    }),
    PostModule,
    AuthorModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
