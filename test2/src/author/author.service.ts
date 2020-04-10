import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
    private authorInDB:any[]=[];
    getAllAuthor(){
        return this.authorInDB;
    }
    getAuthorByID(id){
        let author=this.authorInDB.find(author=>author.id==id)
        return author;
    }
    getAuthorID(){
        if(this.authorInDB){
            return this.authorInDB[0].id;
        }
        return null;
    }
    postAuthor(author){
        this.authorInDB.push(author);
        //console.log(this.authorInDB)
    }
}
