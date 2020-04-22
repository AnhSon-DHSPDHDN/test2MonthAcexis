import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { PostInput } from './post.input';
import { AuthorService } from 'src/author/author.service';
import * as uuidv4 from 'uuidv4';

@Resolver('Post')
export class PostResolver {
    constructor(private readonly postService : PostService, 
                private readonly authorService : AuthorService) {}
    @Query('post')
    post(@Args('postID') postID: String){
        return this.postService.getPostWithID(postID);
    }
    @Mutation()
    @UseGuards(AuthGuard)
    async createPost(@Args('postInput') postInput : PostInput, @Context() ctx) {
        let authorID = ctx.req.decode;
        let createdBy = this.authorService.getAuthorByID(authorID);
        let id = await uuidv4.uuid();
        let newPost = Object.assign( { id }, postInput, { createdBy: createdBy } );
        return newPost;
    }
}
