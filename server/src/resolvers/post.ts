import {Arg, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root} from "type-graphql";
import {Post} from "../entities/Post";
import dataSource  from "../utils/postgresSource";

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
        return root.text.slice(0,50)
    }

    @Query(() => [Post])
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
    ): Promise<Post[]> {
        const realLimit = Math.min(50,limit)
        const AppDataSource = dataSource
        const data = AppDataSource
        .getRepository(Post)
        .createQueryBuilder("postsQuery")
        .orderBy('"createdAt"',"DESC")
        .take(realLimit)
        if (cursor) {
            data.where('"createdAt" < :cursor', { cursor: cursor })
        }
        return data.getMany()
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg("id") id: number,
    ): Promise<Post | null> {
        return Post.findOne({where:{id}})
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