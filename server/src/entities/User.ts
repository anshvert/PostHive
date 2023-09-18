import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    id!: number

    @Field()
    @Property( { type: "text",unique: true })
    username!: string;

    @Field()
    @Property( { type: "email",unique: true })
    email!: string;

    @Field()
    @Property()
    createdAt: Date = new Date()

    @Field()
    @Property({ onUpdate:() => new Date() })
    updatedAt: Date = new Date()

    @Property( { type: "text"})
    password!: string;
}