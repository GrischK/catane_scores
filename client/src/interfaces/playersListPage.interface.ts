import {User} from "../gql/generated/schema";

export interface PlayerInterface {
    name: string;
    picture?: string | null;
}

export interface PlayersPoints {
    player: User;
    victoryCount: number;
    participationCount?: number;
}