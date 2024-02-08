export interface PlayerData {
    id: number;
    name: string;
    picture?: string | null | undefined;
}

export interface ScoreData {
    player?: PlayerData | null | undefined;
    score?: number | null | undefined;
}

export interface GameData {
    id: number;
    date?: string | null | undefined;
    place?: string | null | undefined;
    picture?: string | null | undefined;
    players?: PlayerData | null | undefined;
    scores?: ScoreData[] | null | undefined;
}

export interface GameAccordionProps {
    game: GameData;
    index?: number;
}