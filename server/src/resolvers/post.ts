import {Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root} from "type-graphql";
import {Post} from "../entities/Post";
import dataSource  from "../utils/postgresSource";
import { MyContext } from "src/types";
import { Updoot } from "../entities/Updoot";

@InputType()
class PostInput {
    @Field()
    title: string
    @Field()
    text: string
}

@Resolver(Post)
export class PostResolver {

    @FieldResolver(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.
        slice(0,50)
    }

    @Mutation(() => Boolean)
     async vote(
        @Arg('postId', () => Int) postId: number,
        @Arg('value', () => Int) value: number,
        ) { 
            const userId = '1' 
            const updoot = Updoot.findOne({where: {userId: userId, postId: postId}})
            if (!updoot){
                await Updoot.insert({
                    userId, 
                    postId,
                    value
                })
            }
            await dataSource.query(`
                update post
                set points = points + $1
                where id = $2
            `,[value,postId])
            return true
        }
        
    @Query(() => [Post])
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
    ): Promise<Post[]> {
        const realLimit = Math.min(50,limit)
        const replacements: any[] = [realLimit]
        if (cursor) replacements.push(cursor)
        const posts = await dataSource.query(`
            select p.*,
            json_build_object(
                'username',u.username,
                'id', u.id,
                'email', u.email,
                'createdAt', u."createdAt"
                ) creator
            from post p
            inner join public.user u on u.id = p."creatorId"
            ${cursor ? `where p."createdAt" < $2`: ""}
            order by p.points DESC
            limit $1
        `,replacements)
        return posts
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg("id") id: number,
    ): Promise<Post | null> {
        return Post.findOne({where:{id},relations:["creator"]})
    }   

    @Mutation(() => Post)
    async createPost(
        @Arg("input") input: PostInput,
    ): Promise<Post> {
        return Post.create({
            ...input,
            creatorId: 1
        }).save()
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String,{ nullable:true }) title: string,
    ): Promise<Post | null> {
       const post = await Post.findOne({where: { id }})
        if (!post) return null
        if (typeof title != "undefined") {
            await Post.update({id},{title})
        }
        return post
    }   

    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id: number,
    ): Promise<boolean> { 
        Post.delete({id})
        return true
    }
}