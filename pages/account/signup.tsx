import { authenticateUser, checkAuth } from "../../utils/user";
import { useRouter } from 'next/router';
import { useContext, useRef, useEffect } from "react";
import { useSnackbar } from 'notistack';

// Context
import { UserContext } from "../../context/UserContext";
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../../components/Page/Page"

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// Styles
import styles from "../../styles/pages/account/sign-up-in.module.scss"


export default function SignUp() {
    // Config
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { signUp, currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef<HTMLInputElement>()
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const passwordConfirmRef = useRef<HTMLInputElement>()

    // Check Already SignedIn
    useEffect(() => {
        if (currentUser) {
            router.replace("/")
        }
    }, [])

    // Handlers
    const handleAuth = async (e) => {
        showLoader()
        e.preventDefault();

        let form = document.getElementById("auth-form") as HTMLFormElement;

        // Validate Form
        if (form.checkValidity() === false) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const authData = {
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
            displayName: usernameRef.current.value,
        }

        // Passwords match
        if (authData.password !== passwordConfirmRef.current.value) {
            hideLoader()
            return enqueueSnackbar("Your passwords don't match. Please try again.", {
                variant: 'error',
            });
        }

        // Password Length
        if (authData.password.length < 6) {
            hideLoader()
            return enqueueSnackbar("Your password needs to be at least 6 characters long.", {
                variant: 'error',
            });
        }

        signUp(authData)
            .then(result => {
                hideLoader();
                enqueueSnackbar(`Welcome to The Book Nook ${result.displayName}!`, {
                    variant: 'success',
                });
                router.replace("/account/")
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar(err.message, {
                    variant: 'error',
                });
            })

    }

    return (
        <Page
            title="Sign Up"
            classNameProp={styles.page}
        >
            <Container component="main" maxWidth="xs">
                <div className={styles.logo}>
                    <img src="/images/logos/logo-wide-black.svg" alt="The Book Nook Logo" />
                </div>
                <div className={styles.signin}>
                    <h1>Sign Up</h1>
                    <form id="auth-form">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            inputRef={emailRef}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Full Name"
                            name="username"
                            autoFocus
                            type="text"
                            inputRef={usernameRef}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            inputRef={passwordRef}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password-confirmation"
                            label="Password Confirmation"
                            type="password"
                            id="password-confirmation"
                            inputRef={passwordConfirmRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleAuth}
                        >
                            Sign Up
                    </Button>
                        <Grid container className={styles.options} justify="center">
                            <Grid item>
                                <Link href="/account/signin">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Page >
    );
}