import styles from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {IconButton} from "@mui/material";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {NavBarProps} from "../../interfaces/navBar.interface"

export default function NavBar({children, buttonColor}: NavBarProps) {

    const theme = createTheme({
        palette: {
            primary: {
                main: `${buttonColor}`,
            },
            secondary: {
                main: '#ffd903',
            }
        },
    });

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