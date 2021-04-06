import { useState } from "react";
import axios from "axios";
import { authenticateUser } from "../../../utils/user";
import { ILogin } from "../../../utils/interfaces";

// Styles
import styles from "./login.module.scss";

export default function Login({ handleLoginSuccess }: ILogin) {
    const [showRegister, setShowRegister] = useState(false);

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

        authenticateUser(authData, showRegister)
            .then(result => {
                handleLoginSuccess(showRegister)
            })



    }

    const handleForgotPassword = () => {

    }


    return (
        <div className={styles.login}>
            <h1>
                {showRegister ? "Register" : "Login"}
            </h1>
            <form name="auth-form" id="auth-form" >
                {showRegister
                    ?
                    <>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required />
                    </>
                    : null
                }
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
                <button className="button" onClick={handleAuth}>
                    {showRegister ? "Register" : "Login"}
                </button>
            </form>
            <div className={styles.options}>
                {showRegister
                    ? <>
                        <p onClick={() => setShowRegister(false)}>Already Registered?</p>
                        <span>|</span>
                    </>
                    : <>
                        <p onClick={() => setShowRegister(true)}>Create Account</p>
                        <span>|</span>
                    </>
                }

                <p onClick={handleForgotPassword}>Forgot Password?</p>
            </div>
        </div>
    )
}
