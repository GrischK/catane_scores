import {MouseEventHandler, ReactNode} from "react";
import {GameData} from "./game.interface";

export interface PaginationProps {
    length: number | undefined;
    postsPerPage: number;
    children?: ReactNode;
    games: GameData[] | undefined;
    onClickDeleteGame?: MouseEventHandler<HTMLButtonElement> | undefined;
}
