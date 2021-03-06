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


export default function SignIn() {
    // Config
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { signIn, currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef<HTMLInputElement>()

    const passwordRef = useRef<HTMLInputElement>()


    // Check Already SignedIn
    useEffect(() => {
        if (currentUser) {
            router.replace("/")
        }
    }, [])


    // Handlers
    const handleAuth = (e) => {
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
        // Data
        const authData = {
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
        }

        signIn(authData)
            .then(data => {
                hideLoader()
                enqueueSnackbar(`Welcome back ${data.displayName}!`, {
                    variant: 'success',
                });
                router.replace("/")
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
            title="Sign In"
            classNameProp={styles.page}
            center
        >
            <Container maxWidth="xs">
                <div className={styles.logo}>
                    <img src="/images/logos/logo-wide-black.svg" alt="The Book Nook Logo" />
                </div>
                <div className={styles.signin}>
                    <h1>Sign In</h1>
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleAuth}
                        >
                            Sign In
                    </Button>
                        <Grid container className={styles.options}>
                            <Grid item xs>
                                <Link href="/account/reset-password" variant="body2">
                                    Forgot password?
                        </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/account/signup" variant="body2">
                                    {"Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Page >
    );
}