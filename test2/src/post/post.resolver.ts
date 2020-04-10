import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import {PostService} from './post.service';
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { PostInput } from './post.input';
import { AuthorService } from 'src/author/author.service';


@Resolver('Post')
export class PostResolver {
    constructor(private readonly postService:PostService,private readonly authorService:AuthorService){}
    @Query('post')
    post(@Args('postID') postID: String){
        return this.postService.getPostWithID(postID);
    }
    @Mutation()
    @UseGuards(AuthGuard)
    async createPost(@Args('postInput') postInput:PostInput){
        //let number=Math.random();
        //let id=number.toString(36).substr(2,9);
        let newPost=Object.assign(postInput,{createdBy:this.authorService.getAuthorByID(this.authorService.getAuthorID())});
        await this.postService.creatPost(postInput);
        return newPost;
    }
}
