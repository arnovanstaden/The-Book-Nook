import classnames from "classnames"
import { useRouter } from "next/router";
import { useContext } from "react";


// Interfaces
import { IPage } from "../../utils/interfaces"

// Components
import Head from "../Head/Head";

// Context
import { LoaderContext } from "../../context/loader";

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./page.module.scss"

export default function Layout(props: IPage) {
    // Config
    const router = useRouter();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // Route Change Loader
    const handleRouteChangeStart = () => {
        showLoader()
    }
    const handleRouteChangeComplete = () => {
        hideLoader()
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    const mainClasses = classnames(
        styles.page,
        props.classNameProp ? props.classNameProp : null,
        props.center ? styles.center : null
    )

    return (
        <>
            <Head title={props.title} />
            <main className={mainClasses}>
                {props.noContainer
                    ? props.children
                    :
                    <Container>
                        {props.children}
                    </Container>
                }
            </main>
        </>
    )
}
