import styles from "./ColoredButton.module.css"
import {ColoredButtonProps} from "../../interfaces/coloredButton.interface"

export default function ColoredButton({
                                          children,
                                          bgColor,
                                          onClick,
                                          style,
                                          dataPlayerId,
                                          className,
                                          dataGameId
                                      }: ColoredButtonProps) {
    const buttonClassName = `${styles.colored_button} ${styles[`${bgColor}_button`]} ${styles[`${className}`]}`;

    return (
        <button
            className={buttonClassName}
            onClick={onClick}
            style={style}
            data-player-id={dataPlayerId}
            data-game-id={dataGameId}
        >
            {children}
        </button>
    )
}