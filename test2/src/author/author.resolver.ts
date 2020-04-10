import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import {Author} from './author.input';

@Resolver('Author')
export class AuthorResolver {
    constructor(private readonly authorService:AuthorService){}
    @Query('authors')
    getAllAuthor(){
        return this.authorService.getAllAuthor();
    }
    @Query('author')
    getAuthorByID(@Args('authorID') authorID:String){
        return this.authorService.getAuthorByID(authorID);
    }
    @Mutation()
    async createAuthor(@Args('author') author:Author){
        let {firstName,lastName,dob}=author;
        let number=Math.random();
        let id=number.toString(36).substr(2,9);
        this.authorService.postAuthor({id,firstName,lastName,dob});
        return {id,firstName,lastName,dob};
    }
}
