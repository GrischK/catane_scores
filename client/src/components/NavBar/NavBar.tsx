import styles from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {IconButton} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f04d4d',
        },
        secondary: {
            main: '#ffd903',
        },
    },
});

interface NavBarProps {
    children: ReactNode;
}

export default function NavBar({children}: NavBarProps) {

    return (
        <div className={styles.navBar}>
            <nav>
                <NavLink to={"/"}>
                    <ThemeProvider theme={theme}>
                        <IconButton
                            size='large'
                            color='primary'
                        >
                            <HomeIcon/>
                        </IconButton>
                    </ThemeProvider>
                </NavLink>
            </nav>
            {children}
        </div>
    )
}