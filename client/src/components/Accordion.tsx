import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {PlayerData} from "../gql/generated/schema";
import styles from "../screens/GamesList/GamesList.module.css";
import defaultAvatar from "../assets/images/default_avatar.png";
import React from "react";

interface GameAccordionProps {
    winner: PlayerData;
    participants: PlayerData[];
    index: number;
}

export default function GameAccordion({games, index}: GameAccordionProps) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>
                        <div key={index}>
                            <div>
                                {score.player.picture ?
                                    <img src={score.player.picture}
                                         alt={`image de ${score.player.name}`}
                                    />
                                    :
                                    <img src={defaultAvatar}
                                         alt={`image de ${score.player.name}`}
                                    />
                                }
                                <span className={styles.player_name}>
                                                {score.player.name}
                                            </span>
                            </div>
                            <span className={styles.player_score}>
                                        {score.score}
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