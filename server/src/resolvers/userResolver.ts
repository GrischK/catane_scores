import {Arg, Args, ArgsType, Field, Int, Mutation, Query, Resolver} from "type-graphql";
import User, {UserInput} from "../entities/Users";
import db from "../db";
import {ApolloError} from "apollo-server-errors";
import Game from "../entities/Games";

@ArgsType()
class UsersByIdsArgs {
    @Field(() => [String])
    names: string[];
}

@Resolver()
export default class userResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await db.getRepository(User).find({relations: ["games", "games.players"]});
    }

    @Query(() => [User], {nullable: true})
    async usersByNames(@Args() args: UsersByIdsArgs): Promise<User[]> {
        const {names} = args;
        if (!names || names.length === 0) {
            return [];
        }

        return await db.getRepository(User)
            .createQueryBuilder("user")
            .where("user.name IN (:...names)", {names})
            .leftJoinAndSelect("user.games", "games")
            .leftJoinAndSelect("games.players", "players")
            .getMany();
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

    @Mutation(() => User)
    async updateUser(
        @Arg("id", () => Int) id: number,
        @Arg("data") data: UserInput
    ): Promise<User | null> {
        const userToUpdate = await db.getRepository(User).findOne({where: {id}, relations: {games: true}});
        const {affected} = await db.getRepository(User).update(id, data);

        if (affected === 0) throw new ApolloError("User not found", "NOT_FOUND");

        return userToUpdate
    }
}