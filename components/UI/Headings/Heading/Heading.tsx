import ClassNames from "classnames"

import styles from "./heading.module.scss";

interface IHeading {
    title: string;
    subtitle?: string;
    center?: boolean;
}

export default function Heading({ title, subtitle, center }: IHeading) {

    const classes = ClassNames(
        styles.heading,
        center ? styles.center : null
    )
    return (
        <div className={classes}>
            <h1>{title}</h1>
            <h6>{subtitle}</h6>
        </div>
    )
}
