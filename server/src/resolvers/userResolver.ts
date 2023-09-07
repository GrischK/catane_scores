import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import User, {UserInput} from "../entities/Users";
import db from "../db";
import {ApolloError} from "apollo-server-errors";
import {getRepository} from "typeorm";
import Game from "../entities/Games";

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
        const user = await db.getRepository(User).findOne({where: {id}});
        if (!user) throw new ApolloError("user not found", "NOT_FOUND");

        const games = await db.getRepository(Game).find({where: {players: {id: user.id}}});

        if (games && games.length > 0) {
            throw new ApolloError('Cet utilisateur a des parties en cours. Suppression impossible.', 'USER_HAS_GAMES');
        }

        await db.getRepository(User).delete(id)
        return true
    }
}