import {Query, Resolver} from "type-graphql";
import db from "../db";
import Score from "../entities/Scores";

@Resolver()
export default class gameResolver {
    @Query(() => [Score])
    async scores(): Promise<Score[]> {
        return await db.getRepository(Score).find({relations: {player: true, game: true}});
    }
}