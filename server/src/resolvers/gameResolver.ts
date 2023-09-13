import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import Game, {GameInput, GameInputWithScore} from "../entities/Games";
import db from "../db";
import {ApolloError} from "apollo-server-errors";
import User from "../entities/Users";
import Point from "../entities/Scores";

@Resolver()
export default class gameResolver {
    @Query(() => [Game])
    async games(): Promise<Game[]> {
        return await db.getRepository(Game).find({relations: {players: true}});
    }

    @Mutation(() => Game)
    async createGameWithScores(@Arg("data") data: GameInputWithScore): Promise<Game> {
        const playerIds = data.playersData.map(p => p.player);
        const players = await db.getRepository(User).findByIds(playerIds);

        if (players.length !== playerIds.length) {
            throw new ApolloError("Certains utilisateurs n'ont pas été trouvés.");
        }

        if (players.length < 2 ) {
            throw new ApolloError("Il faut au moins 2 joueurs.");
        }

        // Création du jeu
        const game = new Game();
        game.date = data.date;
        game.place = data.place;
        game.picture = data.picture;
        game.players = players;

        await db.getRepository(Game).save(game);

        const pointsToSave = []; // Tableau pour stocker les points

        for (const playerData of data.playersData) {
            const player = players.find(p => p.id === playerData.player);

            if (player) {
                const scoreData = new Point();
                scoreData.score = playerData.score;
                scoreData.player = player;
                scoreData.game = game;

                pointsToSave.push(scoreData);
            }
        }

        await db.getRepository(Point).save(pointsToSave);

        // Ajout des points au jeu
        game.scores = pointsToSave;

        return game;
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

        await db.getRepository(Game).save(game);
        return game;
    }

    @Mutation(() => String)
    async deleteGame(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await db.getRepository(Game).delete(id);
        if (affected === 0) throw new ApolloError("game not found", "NOT_FOUND");
        return true
    }
}
