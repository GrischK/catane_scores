import {User} from "../gql/generated/schema";

export interface PlayersPoints {
    player: User;
    victoryCount: number;
    participationCount?: number;
}