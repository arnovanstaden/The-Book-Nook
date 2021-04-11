import { IHeader } from "../../../utils/interfaces"

// Styles
import styles from "./header.module.scss";

export default function Header({ heading, subheading }: IHeader) {
    return (
        <header className={styles.header}>
            <div className={styles.image}>
                <img src="/images/test/profile-pic3.jpg" alt="Profile Picture" />
            </div>
            <div className={styles.text}>
                <h1>
                    {heading}
                </h1>
                <p>
                    {subheading}
                </p>
            </div>

        </header>
    )
}
