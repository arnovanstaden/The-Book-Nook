import { authenticateUser, checkAuth } from "../../utils/user";
import { useRouter } from 'next/router';
import { useEffect, useContext, useRef } from "react";
import { useSnackbar } from 'notistack';

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../../components/Page/Page"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// Styles
import styles from "../../styles/pages/account/sign-up-in.module.scss"


export default function ResetPassword() {
    // Config
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { resetPassword } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef<HTMLInputElement>()

    // Handlers
    const handlePasswordReset = (e) => {
        showLoader()
        e.preventDefault();

        let form = document.getElementById("auth-form") as HTMLFormElement;

        // Validate
        if (form.checkValidity() === false) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const email = emailRef.current.value.toLowerCase();

        resetPassword(email)
            .then(data => {
                hideLoader()
                enqueueSnackbar(`Password Reset Link Sent!`, {
                    variant: 'success',
                });
                router.replace("/")
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar("Error sending password reset link", {
                    variant: 'error',
                });
            })
    }

    return (
        <Page
            title="Reset Password"
            classNameProp={styles.page}
            center
        >
            <Container maxWidth="xs">
                <div className={styles.logo}>
                    <img src="/images/logos/logo-wide-black.svg" alt="The Book Nook Logo" />
                </div>
                <div className={styles.signin}>
                    <h1>Reset Password</h1>
                    <form id="auth-form">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            inputRef={emailRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handlePasswordReset}
                        >
                            Reset Password
                    </Button>
                        <Grid container className={styles.options} justify="center">
                            <Grid item >
                                <Link href="/account/signin" variant="body2">
                                    Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Page >
    );
}