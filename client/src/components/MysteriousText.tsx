import React, {useEffect, useState} from "react";
import {animated, useSprings} from "react-spring";
import {ReactNode} from "react";

interface MysteriousTextProps {
    children: ReactNode;
}

export default function MysteriousText({children, ...props}: MysteriousTextProps) {
    const childText = children && typeof children === "string" ? children : "";
    const colors = ["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"];

    const animations = useSprings(
        childText.length,
        childText.split("").map((_, index) => ({
            from: {opacity: 0},
            to: {opacity: 1},
            delay: Math.random() * 750,
        }))
    );

    return (
        <div className={"mysterious_text"}>
            {animations.map((animation, index) => (
                <animated.span key={index} style={{
                    ...animation,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    fontFamily: 'Calistoga',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '5px',
                    marginTop:'5vh',
                    WebkitTextStroke: '.5px black'
                }} {...props}>
                    {childText[index]}
                </animated.span>
            ))}
        </div>
    );
}
