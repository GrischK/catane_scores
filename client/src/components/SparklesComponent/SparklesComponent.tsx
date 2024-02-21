import Sparkle from "../Sparkle/SparkleInstance";
import {generateSparkle, range, useRandomInterval} from "../../utils/functions";
import React, {ReactNode} from "react";
import styles from "./SparklesComponent.module.css";
import {SparklesComponentProps} from "../../interfaces/SparklesComponent.interface";

const defaultColor = 'hsl(50deg, 100%, 50%)';

export default function SparklesComponent({color = defaultColor, children}: SparklesComponentProps) {

    const [sparkles, setSparkles] = React.useState(() => {
        return range(3).map(() => generateSparkle(color));
    });

    useRandomInterval(
        () => {
            const sparkle = generateSparkle(color);
            const now = Date.now();
            const nextSparkles = sparkles.filter(sp => {
                const delta = now - sp.createdAt;
                return delta < 750;
            });
            nextSparkles.push(sparkle);
            setSparkles(nextSparkles);
        },
        50, 600
    );

    return (
        <span
            className={styles.wrapper}
        >
            {sparkles.map(sparkle => (
                <Sparkle
                    key={sparkle.id}
                    color={sparkle.color}
                    size={sparkle.size}
                    style={sparkle.style}
                />
            ))}
            <strong
                className={styles.child_wrapper}
            >
                {children}
            </strong>
        </span>
    );
}