import { InputType, Field, Float } from "@nestjs/graphql";

@InputType()
export class Author{
    @Field()
    public id:String;
    @Field() 
    public firstName:String;
    @Field()
    public lastName:String;
    @Field(()=>Float)
    public dob:Number;

}