import Page from "../components/Page/Page";
import Link from "next/link";

// MUI
import Button from "@material-ui/core/Button"

import styles from "../styles/pages/404.module.scss"

export default function PageNotFound() {
    return (
        <Page
            title="Page Not Found"
            center>
            <div className={styles.notFound}>
                <div className={styles.error}>
                    <h1>4</h1>
                    <img src="/images/logos/logo-icon-black.svg" alt="" />
                    <h1>4</h1>
                </div>
                <p>The page you are looking for does not exist...</p>
                <Button
                    variant="contained"
                    color="primary"
                >
                    <Link href="/">
                        <a>Go Home</a>
                    </Link>
                </Button>
            </div>
        </Page>
    )
}
