import Link from "next/link";

// Components
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

//Styles
import styles from "./mobile-nav.module.scss";

export default function MobileNav() {
    return (
        // <nav className={styles.nav}>

        //     <Link href="/">
        //         <a>
        //             <i className="icon-home"></i>
        //             Home
        //         </a>
        //     </Link>

        //     <Link href="/books">
        //         <a>
        //             <i className="icon-book"></i>
        //             Books
        //         </a>
        //     </Link>

        //     <Link href="/clubs">
        //         <a>
        //             <i className="icon-group"></i>
        //             Clubs
        //         </a>
        //     </Link>

        //     <Link href="/account">
        //         <a>
        //             <i className="icon-account"></i>
        //             Account
        //         </a>
        //     </Link>
        // </nav>
        <BottomNavigation
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            showLabels
            className={styles.nav}
        >
            <BottomNavigationAction color="secondary" label="Home" icon={<i className="icon-home" />} />
            <BottomNavigationAction label="Books" icon={<i className="icon-book" />} />
            <BottomNavigationAction label="Clubs" icon={<i className="icon-group" />} />
            <BottomNavigationAction label="Account" icon={<i className="icon-account" />} />
        </BottomNavigation>
    )
}
