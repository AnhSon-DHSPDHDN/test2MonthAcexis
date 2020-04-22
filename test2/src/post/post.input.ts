import { 
    InputType, 
    Field, 
    ID 
} from "@nestjs/graphql";

@InputType()
export class postID{
    @Field(()=>ID)
    public id;
}
export class PostInput{
    @Field()
    public title: String;
    @Field()
    public content: String;
    @Field(()=>String!)
    public categories:String;
}