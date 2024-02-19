import {GameData} from "./game.interface";
import {MouseEventHandler} from "react";

export interface GameCardProps {
    game: GameData;
    index: number;
    onClickDeleteFunction?: MouseEventHandler<HTMLButtonElement>;
    dataGameId?: number;
}