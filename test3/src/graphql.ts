
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface MessageInput {
    content: string;
    roomID: string;
}

export interface Message {
    _id?: string;
    createdBy?: string;
    roomID?: string;
    content?: string;
    createdAt?: number;
}

export interface IMutation {
    createMessage(message?: MessageInput): Message | Promise<Message>;
}

export interface IQuery {
    getAllMess(): Message[] | Promise<Message[]>;
}

export interface ISubscription {
    messageCreated(roomID: string): Message | Promise<Message>;
}
