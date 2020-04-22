import { 
    Resolver, 
    Query, 
    Mutation, 
    Args 
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import {Author} from './author.input';
import * as uuidv4 from 'uuidv4';

@Resolver('Author')
export class AuthorResolver {
    constructor(private readonly authorService : AuthorService){}
    @Query('authors')
    getAllAuthor(){
        return this.authorService.getAllAuthor();
    }
    @Query('author')
    getAuthorByID(@Args('authorID') authorID : String){
        return this.authorService.getAuthorByID(authorID);
    }
    @Mutation()
    async createAuthor(@Args('author') author : Author){
        let id = await uuidv4.uuid();
        let newAuthor = Object.assign( {id}, author )
        this.authorService.postAuthor(newAuthor);
        return newAuthor;
    }
}
