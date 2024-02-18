import styles from "./Pagination.module.css"
import React, {MouseEventHandler, ReactNode, useState} from "react";
import {GameData} from "../../interfaces/game.interface";
import GameCard from "../GameCard/GameCard";
import {motion} from "framer-motion";

interface PaginationProps {
    length: number | undefined;
    postsPerPage: number;
    children?: ReactNode;
    games: GameData[] | undefined;
    onClickDeleteGame?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Pagination({length, postsPerPage, games, onClickDeleteGame}: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const paginationNumber: number[] = []
    const totalPages = Math.ceil(length ? (length / postsPerPage) : 1);

    for (let i = 1; i <= totalPages; i++) {
        paginationNumber.push(i)
    }

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, length || 0);
    const currentItems = games?.slice(startIndex, endIndex).map((game, index) => (
        <motion.div
            initial={{y: '-100vh'}}
            animate={{y:0}}
            transition={{delay:Math.random()}}
            key={game.id}
        >
            <GameCard
                game={game}
                index={index}
                onClickDeleteFunction={onClickDeleteGame}
            />
        </motion.div>
    ));

    return (
        <div
            className={styles.pagination}
        >
            {currentItems}
            <div className={styles.pagination_buttons_wrapper}>
                {paginationNumber.map((pageNumber) =>
                    (
                        <button
                            className={currentPage === pageNumber ? styles.active : ''}
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}
