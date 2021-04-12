import classnames from "classnames"

// Interfaces
import { IPage } from "../../utils/interfaces"

// Components
import Head from "../Head/Head";

// MUI
import { Container } from "@material-ui/core";

// Styles
import styles from "./page.module.scss"

export default function Layout(props: IPage) {

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
