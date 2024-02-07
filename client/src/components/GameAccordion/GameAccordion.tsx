import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import defaultAvatar from "../../assets/images/default_avatar.png";
import styles from "./GameAccordion.module.css"

interface PlayerData {
    id: number;
    name: string;
    picture?: string | null | undefined;
}

interface ScoreData {
    player?: PlayerData | null | undefined;
    score?: number | null | undefined;
}

interface GameData {
    id: number;
    date?: string | null | undefined;
    place?: string | null | undefined;
    picture?: string | null | undefined;
    players?: PlayerData | null | undefined;
    scores?: ScoreData[] | null | undefined;
}

interface GameAccordionProps {
    game: GameData;
    index?: number;
}

export default function GameAccordion({game, index}: GameAccordionProps) {

    console.log(game)
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Hello {index}
                    <Typography>
                        <div
                            className={styles.accordion_summary_player_info}
                            key={index}
                        >
                            <div>
                                {game.scores?.[0]?.player?.picture ?
                                    <img src={game.scores?.[0]?.player?.picture}
                                         alt={`image de ${game.scores?.[0]?.player?.name}`}
                                    />
                                    :
                                    <img src={defaultAvatar}
                                         alt={`image de ${game.scores?.[0]?.player?.picture}`}
                                    />
                                }
                                <span className={styles.player_name}>
                                                {game.scores?.[0]?.player?.name}
                                            </span>
                            </div>
                            <span className={styles.player_score}>
                                        {game.scores?.[0]?.score}

                            </span>
                        </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}