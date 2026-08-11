import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../services/api";
import "../styles/Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await apiCall(
                "/api/register",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            navigate("/login");

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
        <div className="register-page">

            <div className="register-card">

                {/* LEFT SIDE */}

                <div className="register-brand">

                    <div className="register-logo">
                        Resume Pilot
                    </div>

                    <h1>
                        Build your
                        <br />
                        career with confidence.
                    </h1>

                    <p>
                        Create a professional resume
                        that highlights your skills,
                        experience and achievements.
                    </p>

                    <div className="register-points">

                        <div>
                            ✓ ATS-friendly formatting
                        </div>

                        <div>
                            ✓ Modern professional templates
                        </div>

                        <div>
                            ✓ Download resumes as PDF
                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="register-form-container">

                    <div className="register-header">

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Get started with ResumePilot
                            today.
                        </p>

                    </div>


                    <form
                        className="register-form"
                        onSubmit={handleRegister}
                    >

                        {/* NAME */}

                        <div className="register-field">

                            <label htmlFor="name">
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your full name"
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="register-field">

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


                        {/* PASSWORD */}

                        <div className="register-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="register-password-input">

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
                                    placeholder="Create a password"
                                    minLength={6}
                                    required
                                />

                                <button
                                    type="button"
                                    className="register-show-password"
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

                            <small>
                                Use at least 6 characters.
                            </small>

                        </div>


                        {error && (
                            <div className="register-error">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="register-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>

                    </form>


                    {/* LOGIN BUTTON */}

                    <div className="register-login">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Sign in
                        </button>

                    </div>


                    <div className="register-footer">
                        © 2026 ResumePilot
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;