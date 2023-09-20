import styles from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {IconButton} from "@mui/material";

interface NavBarProps {
    children: ReactNode;
}

export default function NavBar({children}: NavBarProps) {

    return (
        <div className={styles.navBar}>
            <nav>
                <NavLink to={"/"}>
                    <IconButton
                        size="large"
                    >
                        <HomeIcon/>
                    </IconButton>
                </NavLink>
            </nav>
            {children}
        </div>

    )
}