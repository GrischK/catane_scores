export const buttonTransition = {
    duration: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
    scale: {
        type: "spring",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001
    }
}

export const createGameButtonVariants = {
    hidden: {y: '100vh'},
    visible: {
        y: '5vh',
        transition: {
            delay: 1.5,
            duration: 1,
            type: "spring",
            stiffness: 55,
            damping: 9,
        }
    }
}

export const inputVariants = {
    hidden: {opacity: 0, scale: 0.5},
    visible: {
        opacity: 1, scale: 1, transition: {
            duration: 0.7,
            delay: 1.4,
            ease: [0, 0.71, 0.2, 1.01]
        }
    }
}

export const crownTransition = {
    duration: 4,
    ease: [0, 0.71, 0.2, 1.01],
    type: "spring",
    damping: 11,
    stiffness: 100,
    mass: 0.5,
    restDelta: 0.001,
    delay: 3
}
