import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Game, {GameInput} from "../entities/Games";
import db from "../db";
import {ApolloError} from "apollo-server-errors";
import User from "../entities/Users";

@Resolver()
export default class gameResolver {
    @Query(() => [Game])
    async games(): Promise<Game[]> {
        return await db.getRepository(Game).find({relations: {players: true}});
    }

    @Mutation(() => Game)
    async createGame(@Arg("data") data: GameInput): Promise<Game> {
        const playerIds = data.players.map(player => player.id);
        const players = await db.getRepository(User).findByIds(playerIds);

        if (players.length !== playerIds.length) {
            throw new ApolloError("Certains utilisateurs n'ont pas été trouvés.");
        }

        const game = new Game();

        game.date = data.date;
        game.place = data.place;
        game.picture = data.picture;
        game.players = players;

        // Enregistrer la partie dans la base de données
        await db.getRepository(Game).save(game);
        return game;
    }
    //
    // @Mutation(() => String)
    // async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    //     const {affected} = await db.getRepository(User).delete(id);
    //     if (affected === 0) throw new ApolloError("user not found", "NOT_FOUND");
    //     return true
    // }
}
