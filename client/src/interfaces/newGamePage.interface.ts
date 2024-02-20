export interface PlayerData {
    player: number;
    score: number;
}

export interface GameInterface {
    date?: string | null;
    place?: string | null;
    playersData: PlayerData[];
}