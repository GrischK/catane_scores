import {GameData} from "./game.interface";
import {MouseEventHandler} from "react";

export interface GameAccordionProps {
    game: GameData;
    index: number;
    onClickDeleteFunction?: MouseEventHandler<HTMLButtonElement>;
}