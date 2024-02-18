import {createTheme} from "@mui/material/styles";

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const deleteModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '2vh',
    boxShadow: 24,
    p: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '2vh',
    boxShadow: 24,
    p: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const newGameModalStyle =
    {
        ...modalStyle,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        width: 'fit-content',
        gap: '3vh'
    }


export const theme = createTheme({
    palette: {
        primary: {
            main: '#5ba1fc',
        },
        secondary: {
            main: '#ffd903',
        }
    },
});

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#5ba1fc',
        },
        secondary: {
            main: '#ffd903',
        }
    },
});