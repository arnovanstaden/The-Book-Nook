import { createContext, useState } from "react";

// MUI
import { Backdrop, CircularProgress } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

export const LoaderContext = createContext(null);

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const LoaderProvider = ({ children }) => {
    const classes = useStyles();

    // State
    const [show, setShow] = useState(false);

    const showLoader = () => {
        setShow(true)
    };

    const hideLoader = () => {
        setShow(false)
    };

    return (
        <LoaderContext.Provider
            value={{ showLoader, hideLoader }
            }>
            <Backdrop className={classes.backdrop} open={show}>
                <CircularProgress color="inherit" />
            </Backdrop>
            { children}
        </LoaderContext.Provider>
    );
}