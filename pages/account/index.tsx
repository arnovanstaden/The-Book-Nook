import withAuth from "../../components/HOC/withAuth";
import { useContext } from "react";
import Link from "next/link";

// Context
import { UserContext } from "../../context/UserContext"

// Components
import Header from "../../components/UI/Header/Header";
import Page from "../../components/Page/Page";

// MUI
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "../../styles/pages/account/index.module.scss";


function Account() {

    // Config
    const { currentUser } = useContext(UserContext);
    console.log(currentUser)

    return (
        <Page
            title="Your Account"
        >
            <h1>Account</h1>
            <Avatar alt={currentUser.displayName} src="/static/images/avatar/1.jpg" />
            <p>User since {currentUser.metadata.creationTime}</p>

            <form id="account-form">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="displayName"
                    label="Your Name"
                    name="displayName"
                    type="text"
                    defaultValue={currentUser.displayName}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    defaultValue={currentUser.email}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="bio"
                    label="Bio"
                    type="text"
                    id="bio"
                    multiline
                    rows={4}
                // defaultValue={currentUser.displayName}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
            </form>

        </Page>
    )
}

export default withAuth(Account)
