import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">

            <div className="login-card">

                {/* LEFT SIDE */}

                <div className="login-brand">

                    <div className="login-logo">
                        Resume Pilot
                    </div>

                    <h1>
                        Welcome back to
                        <br />
                        ResumePilot
                    </h1>

                    <p>
                        Create professional,
                        ATS-friendly resumes and
                        take the next step in your
                        career.
                    </p>

                    <div className="login-points">

                        <div>✓ ATS-friendly resumes</div>
                        <div>✓ Professional templates</div>
                        <div>✓ High-quality PDF export</div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="login-form-container">

                    <div className="login-header">

                        <h2>Sign in</h2>

                        <p>
                            Enter your details to
                            access your account.
                        </p>

                    </div>


                    <form
                        className="login-form"
                        onSubmit={handleLogin}
                    >

                        <div className="login-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                required
                            />

                        </div>


                        <div className="login-field">

                            <div className="login-password-label">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="login-forgot"
                                    onClick={() =>
                                        alert(
                                            "Password reset functionality will be added soon."
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>

                            </div>


                            <div className="login-password-input">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="login-show-password"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}
                        </button>

                    </form>


                    {/* REGISTER BUTTON */}

                    <div className="login-register">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Create an account
                        </button>

                    </div>


                    <div className="login-footer">
                        © 2026 ResumePilot
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;