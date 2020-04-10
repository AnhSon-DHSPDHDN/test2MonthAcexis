import { Resolver, Mutation, Args, GqlExecutionContext, Context, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { ExecutionContext, UseGuards, Req } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth.guard';

const pubsub = new PubSub();
@Resolver('Message')
export class MessageResolver {
    constructor(private readonly messageService: MessageService){}
    @Mutation()
    @UseGuards(AuthGuard)
    createMessage(@Args('message') message, @Context() context){
        let token=context.req.headers.authorization.split(' ')[1];
        const jwt=require('jsonwebtoken');
        let createdBy=jwt.decode(token);
        let number=Math.random();
        let _id=number.toString(36).substr(2,9);
        let newMess=Object.assign({_id},{createdBy:createdBy.userID},message);
        this.messageService.createMessage(newMess);
        pubsub.publish('messageCreated',{
            messageCreated: newMess
        });
        return newMess;
    }

    @Subscription('messageCreated',{
        filter: (payload, variables, context)=>{
            let quyen=context.req.privileges;
            let messToRoom=payload.messageCreated.roomID;
            let check=quyen.find(quyen=>(quyen==messToRoom))
            if(variables.roomID==messToRoom&&check) return true;           
            return false;
        }
    })
    messageCreated(){
        return pubsub.asyncIterator('messageCreated');
    }
}
