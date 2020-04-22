import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MessageModule } from './message/message.module';
import * as jwt from 'jsonwebtoken';

@Module({
  imports: [ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts')
      },
      context: ({ req, res, connection }) => { 
        if(connection){
          return {
            req: connection.context
          }
        }
        return {
          req,res
        }
      },
      installSubscriptionHandlers:true,
      subscriptions: {
        onConnect: (connectionParams , ws) => {
          let header = Object.assign(connectionParams)
          if( header.Authorization === undefined ) return false;
          let token = header.Authorization.split(' ')[1];
          let check = null;
          if(token){
            jwt.verify(token, 'sup3rs3cr3t', (err,decode) => {
              if(err){
                check = false;
              }else{
                check = decode;
              }
            });
            return check;
          }
          return false;
        }
      }
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
