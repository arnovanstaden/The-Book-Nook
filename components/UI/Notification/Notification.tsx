import { INotification } from "../../../utils/interfaces";

// Styles
import styles from "./notification.module.scss";



export default function Notification({ text }: INotification) {
    return (
        <div className={styles.notification}>
            <p>{text}</p>
        </div>
    )
}
