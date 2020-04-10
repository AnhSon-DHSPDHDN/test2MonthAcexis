import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    private postDB:any[]=[];
    getAllPost(){
        return this.postDB;
    }
    getPostWithID(id){
        let post=this.postDB.find(post=>post.id==id);
        return post;
    }
    creatPost(post){
        return this.postDB.push(post);
        //console.log(this.postDB)
    }
}
