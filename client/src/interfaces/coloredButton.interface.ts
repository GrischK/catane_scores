import {ReactNode} from "react";

export interface ColoredButtonProps {
    children: ReactNode;
    bgColor: string;
    onClick?: any;
    style?: object;
    dataPlayerId?: number;
    className?: string;
    dataGameId?: number;
}