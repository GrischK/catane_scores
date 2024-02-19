import {User} from "../gql/generated/schema";

export interface PlayersPoints {
    player: User;
    playerTotalPoints: number;
}