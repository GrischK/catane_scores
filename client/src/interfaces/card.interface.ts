import {MouseEventHandler} from "react";

export interface CardProps {
    playerName: string,
    playerAvatar: string | null | undefined,
    onClickDeleteFunction: MouseEventHandler<HTMLButtonElement>,
    userId: number,
    gamesCounter: number | undefined,
    refreshPlayersList: any,
    playerRank: number | undefined
}