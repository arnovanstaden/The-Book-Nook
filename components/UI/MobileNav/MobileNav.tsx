import Link from "next/link"

//Styles
import styles from "./mobile-nav.module.scss";

export default function MobileNav() {
    return (
        <nav className={styles.nav}>

            <Link href="/">
                <a>
                    <i className="icon-home"></i>
                    Home
                </a>
            </Link>

            <Link href="/books">
                <a>
                    <i className="icon-book"></i>
                    Books
                </a>
            </Link>

            <Link href="/clubs">
                <a>
                    <i className="icon-group"></i>
                    Clubs
                </a>
            </Link>

            <Link href="/account">
                <a>
                    <i className="icon-account"></i>
                    Account
                </a>
            </Link>
        </nav>
    )
}
