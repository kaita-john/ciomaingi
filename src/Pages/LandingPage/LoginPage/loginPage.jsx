import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios"; // Install with `npm install axios`
import styles from "./LoginPage.module.css";
import {useAuth} from "../../../Components/authContext.jsx";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth(); // Use AuthContext for login

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("https://ciomaingifarm.website/api/v1/users/login", {
                email,
                password,
            });

            if (response.data.access) {
                login(response.data.access); // Save the access token via AuthContext
                console.log(`${response.data.access} - Access`)
                const from = location.state?.from?.pathname || "/admin/index"; // Redirect to admin site or previous page
                navigate(from, {replace: true});
            } else {
                setError("Invalid email or password. Please try again.");
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "An error occurred. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.loginTitle}>Welcome Back</h1>
                <p className={styles.loginSubtitle}>Sign in to your admin account</p>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your email"
                            required
                            autoFocus
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    <p className={styles.forgotPassword}>
                        <a href="/forgot-password" className={styles.forgotLink}>
                            Forgot Password?
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );

};

export default LoginPage;