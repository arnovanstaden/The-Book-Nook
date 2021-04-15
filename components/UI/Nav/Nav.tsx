
import Link from "next/link";
import React, { useState, useContext } from "react";
import { useSnackbar } from 'notistack';


// Context
import { UserContext } from '../../../context/UserContext';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuBook from '@material-ui/icons/MenuBook';
import useMediaQuery from '@material-ui/core/useMediaQuery';


// Styles, Images
import styles from "./nav.module.scss";

export default function Nav() {
    // Config 
    const { enqueueSnackbar } = useSnackbar();
    const { signOut, currentUser } = useContext(UserContext);

    // Handlers

    const handleLogout = () => {
        signOut()
            .then(() => {
                enqueueSnackbar('Logout Successful', {
                    variant: 'success',
                });
            })
            .catch(err => console.log(err))
    }

    // Subcomponents

    const MenuItems = () => {
        // State
        const [anchorEl, setAnchorEl] = useState(null);

        // Handlers
        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        const handleMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuLogout = () => {
            handleMenuClose();
            handleLogout()
        }


        return (
            <div>
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
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            <Link href="/account/">
                                <a>
                                    Account
                            </a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        )
    }

    // Mobile Nav
    const ismobileDevice = useMediaQuery('(max-width:600px)');
    const MobileNav = () => {

        const [drawer, setDrawer] = useState(false)

        const handleDrawerToggle = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            setDrawer(prevState => !prevState);
        };

        return (
            <div className={styles.mobileNav}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle("right", true)}>
                    <MenuIcon />
                </IconButton>
                <React.Fragment key={"right"}>
                    <SwipeableDrawer
                        anchor={"right"}
                        open={drawer}
                        onClose={handleDrawerToggle("right", false)}
                        onOpen={handleDrawerToggle("right", true)}
                    >
                        <List
                            onClick={handleDrawerToggle("right", true)}
                            className={styles.list}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="/">
                                        Home
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="/clubs">
                                        Clubs
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <MenuBook />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="/books">
                                        Books
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="/account">
                                        Account
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText onClick={handleLogout}>
                                    Logout
                                </ListItemText>
                            </ListItem>
                        </List>
                    </SwipeableDrawer>
                </React.Fragment>
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
                {ismobileDevice ?
                    currentUser ? <MobileNav /> : null
                    : currentUser ? <MenuItems /> : null}
            </Toolbar>
        </AppBar >
    )
}


