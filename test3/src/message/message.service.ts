import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
    private messageDB = [];
    createMessage(mess){
        this.messageDB.push(mess);
    }
}
