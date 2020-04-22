import { 
    Resolver,
    Mutation, 
    Args, 
    Context, 
    Subscription 
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { PubSub } from 'graphql-subscriptions';
import * as jwt from 'jsonwebtoken';
import * as uuidv4 from 'uuidv4';

const pubsub = new PubSub();
@Resolver('Message')
export class MessageResolver {
    constructor(private readonly messageService: MessageService){}
    @Mutation()
    createMessage(@Args('message') message, @Context() context){
        let token = context.req.headers.authorization.split(' ')[1];
        let createdBy = jwt.decode(token);
        const _id = uuidv4.uuid();
        let newMess = Object.assign( {_id} , { createdBy: createdBy.userID }, message);
        this.messageService.createMessage(newMess);
        pubsub.publish('messageCreated', {
            messageCreated: newMess
        });
        return newMess;
    }

    @Subscription('messageCreated', {
        filter: (payload, variables, context) => {
            let quyen = context.req.privileges;
            let messToRoom = payload.messageCreated.roomID;
            let check = quyen.find( quyen => ( quyen === messToRoom ))
            if(variables.roomID === messToRoom && check) return true;           
            return false;
        }
    })
    messageCreated(){
        return pubsub.asyncIterator('messageCreated');
    }
}
