import Link from "next/link";
import { useState, useContext } from "react";
import { useSnackbar } from 'notistack';

// Context
import { UserContext } from '../../../context/user';

// MUI
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

// Styles, Images
import styles from "./nav.module.scss";

export default function Nav() {
    // Config 
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // State
    const { user, logout } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);


    // Handlers
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        enqueueSnackbar('Logout Successful', {
            variant: 'success',
        });
    }

    // Subcomponents
    const AccountOptions = () => {
        return (
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link href="/account/">
                            <a>
                                Profile
                            </a>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar component="nav" className={styles.nav}>
                <Link href="/">
                    <a className={styles.logo}>
                        <img src="/images/logos/logo-icon-white.svg" alt="The Book Nook Logomark" />
                        The Book Nook
                    </a>
                </Link>
                <div className={styles.right}>
                    <Link href="/">
                        <a className={styles.item}>
                            Home
                        </a>
                    </Link>
                    <Link href="/books/">
                        <a className={styles.item}>
                            Books
                        </a>
                    </Link>
                    <Link href="/clubs/">
                        <a className={styles.item}>
                            Clubs
                        </a>
                    </Link>
                    {user.auth ? <AccountOptions /> : null}
                </div>
            </Toolbar>
        </AppBar>
    )
}


