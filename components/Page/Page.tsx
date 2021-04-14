import classnames from "classnames"
import Router from "next/router";
import { useContext, useEffect } from "react";


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
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // Route Change Loader
    useEffect(() => {
        const handleRouteChangeStart = () => {
            showLoader()
        }
        const handleRouteChangeComplete = () => {
            hideLoader()
        }

        Router.events.on('routeChangeStart', handleRouteChangeStart)

        return () => {
            Router.events.on('routeChangeComplete', handleRouteChangeComplete)
        }
    }, [])

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
