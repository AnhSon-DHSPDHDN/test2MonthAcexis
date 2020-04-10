
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum PostCategory {
    PROMOTIONAL = "PROMOTIONAL",
    CONTROVERSIAL = "CONTROVERSIAL",
    LIFESTYLE = "LIFESTYLE",
    PERSONAL = "PERSONAL"
}

export interface AuthorInput {
    firstName: string;
    lastName: string;
    dob: number;
}

export interface PostInput {
    title: string;
    content: string;
    categories: PostCategory[];
}

export interface Author {
    id?: string;
    firstName?: string;
    lastName?: string;
    dob?: number;
}

export interface IMutation {
    createAuthor(author: AuthorInput): Author | Promise<Author>;
    createPost(postInput: PostInput): Post | Promise<Post>;
}

export interface Post {
    id?: string;
    title?: string;
    content?: string;
    categories?: PostCategory[];
    createdAt?: number;
    createdBy?: Author;
}

export interface IQuery {
    author(authorID?: string): Author | Promise<Author>;
    authors(): Author[] | Promise<Author[]>;
    post(postID: string): Post | Promise<Post>;
}
