import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
    game?: GameData;
    index?: number;
}

export default function GameAccordion({game, index}: GameAccordionProps) {
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
                        {/*<div key={index}>*/}
                        {/*    <div>*/}
                        {/*        {score.player.picture ?*/}
                        {/*            <img src={score.player.picture}*/}
                        {/*                 alt={`image de ${score.player.name}`}*/}
                        {/*            />*/}
                        {/*            :*/}
                        {/*            <img src={defaultAvatar}*/}
                        {/*                 alt={`image de ${score.player.name}`}*/}
                        {/*            />*/}
                        {/*        }*/}
                        {/*        <span className={styles.player_name}>*/}
                        {/*                        {score.player.name}*/}
                        {/*                    </span>*/}
                        {/*    </div>*/}
                        {/*    <span className={styles.player_score}>*/}
                        {/*                {score.score}*/}
                        {/*                </span>*/}
                        {/*</div>*/}
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