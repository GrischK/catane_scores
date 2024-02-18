import styles from "./ColoredButton.module.css"
import {ReactNode} from "react";

interface ColoredButtonProps {
    children: ReactNode;
    bgColor: string;
    onClick?: any;
    style?: object;
    dataPlayerId?: number;
    className?: string;
}

export default function ColoredButton({
                                          children,
                                          bgColor,
                                          onClick,
                                          style,
                                          dataPlayerId,
                                          className
                                      }: ColoredButtonProps) {
    const buttonClassName = `${styles.colored_button} ${styles[`${bgColor}_button`]} ${styles[`${className}`]}`;

    return (
        <button className={buttonClassName} onClick={onClick} style={style} data-player-id={dataPlayerId}>
            {children}
        </button>
    )
}