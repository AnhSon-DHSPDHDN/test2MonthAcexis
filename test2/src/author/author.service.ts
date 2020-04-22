import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
    private authorInDB : any[] = [];
    getAllAuthor(){
        return this.authorInDB;
    }
    getAuthorByID(id){
        let author = this.authorInDB.find( author => author.id === id)
        return author;
    }
    
    postAuthor(author){
        this.authorInDB.push(author);
    }
}
