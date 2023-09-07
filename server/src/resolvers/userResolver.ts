import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import User, {UserInput} from "../entities/Users";
import db from "../db";
import {ApolloError} from "apollo-server-errors";

@Resolver()
export default class userResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await db.getRepository(User).find();
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: UserInput): Promise<User> {
        const user = await db.getRepository(User).save(data);
        return user;
    }

    @Mutation(() => String)
    async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await db.getRepository(User).delete(id);
        if (affected === 0) throw new ApolloError("user not found", "NOT_FOUND");
        return true
    }
}