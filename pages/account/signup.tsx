import { authenticateUser, checkAuth } from "../../utils/user";
import { useRouter } from 'next/router';
import { useEffect } from "react";


// Components
import Page from "../../components/Page/Page"

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

    // Check Already SignedIn
    useEffect(() => {
        if (checkAuth()) {
            router.replace("/")
        }
    }, [])


    // Handlers
    const handleAuth = (e) => {
        e.preventDefault();

        let form = document.getElementById("auth-form") as HTMLFormElement;

        // Validate
        if (form.checkValidity() === false) {
            return alert("Please complete all the relevant fields")
        }

        // Data
        let authData = {
            email: "",
            password: ""

        }
        let formData = new FormData(form)
        for (var key of formData.keys()) {
            authData[key] = formData.get(key)
        }

        authData.email = authData.email.toLowerCase();

        authenticateUser(authData, true)
            .then(result => {
                router.replace("/")
            })
            .catch(err => {
                console.log(err);

                // [Notify]
                alert("Invalid Credentials")
            })
    }

    return (
        <Page
            title="Sign Up"
            classNameProp={styles.page}
        >
            <Container component="main" maxWidth="xs">
                <div className={styles.logo}>
                    {/* <img src="/public/images/logos/" alt=""/> */}
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
                            label="Your Name"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
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
                        <Grid container className={styles.options}>
                            <Grid item xs>
                                <Link href="#">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/account/signup">
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