import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../services/api";
import "../styles/Profile.css";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
}

function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<UserProfile>({
        name: "",
        email: "",
        phone: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    // =========================
    // GET PROFILE
    // =========================

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const data = await apiCall(
                    "/api/profile",
                    {
                        method: "GET",
                    }
                );

                setProfile({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                });

            } catch (error) {
                console.error("Profile error:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load profile"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);


    // =========================
    // INPUT CHANGE
    // =========================

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));

        setMessage("");
        setError("");
    }


    // =========================
    // UPDATE PROFILE
    // =========================

    async function handleSave(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const data = await apiCall(
                "/api/profile",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        name: profile.name,
                        email: profile.email,
                        phone: profile.phone,
                    }),
                }
            );

            setProfile({
                name: data.user.name || "",
                email: data.user.email || "",
                phone: data.user.phone || "",
            });

            setMessage(
                "Profile updated successfully."
            );

        } catch (error) {
            console.error("Update profile error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile"
            );

        } finally {
            setSaving(false);
        }
    }


    // =========================
    // LOGOUT
    // =========================

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }


    // =========================
    // CHANGE PASSWORD
    // =========================

    function handlePasswordChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setPasswordMessage("");
        setPasswordError("");
    }

    async function handleChangePassword(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {
            setPasswordError(
                "New passwords do not match."
            );

            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError(
                "New password must be at least 6 characters."
            );

            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setChangingPassword(true);

        try {

            await apiCall(
                "/api/change-password",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        currentPassword:
                            passwordData.currentPassword,

                        newPassword:
                            passwordData.newPassword,
                    }),
                }
            );

            setPasswordMessage(
                "Password changed successfully. Please login again."
            );

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
            }, 2000);

        } catch (error) {

            setPasswordError(
                error instanceof Error
                    ? error.message
                    : "Failed to change password"
            );

        } finally {
            setChangingPassword(false);
        }
    }


    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="profile-page">

                <main className="profile-container">

                    <div className="profile-loading">
                        Loading profile...
                    </div>

                </main>

            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (
        <div className="profile-page">

            <main className="profile-container">

                <div className="profile-heading">

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal information
                        and account.
                    </p>

                </div>


                {/* Profile Card */}

                <section className="profile-card">

                    <div className="profile-avatar">

                        {profile.name
                            ? profile.name
                                .charAt(0)
                                .toUpperCase()
                            : "👤"}

                    </div>

                    <h2>
                        {profile.name || "Your Name"}
                    </h2>

                    <p className="profile-email">
                        {profile.email || "your@email.com"}
                    </p>

                </section>


                {/* Personal Information */}

                <section className="profile-section">

                    <h2>Personal Information</h2>

                    <form onSubmit={handleSave}>

                        <div className="form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="phone">
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={profile.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />

                        </div>


                        {/* Success */}

                        {message && (
                            <p className="success-message">
                                ✓ {message}
                            </p>
                        )}


                        {/* Error */}

                        {error && (
                            <p className="error-message">
                                {error}
                            </p>
                        )}


                        <button
                            type="submit"
                            className="save-profile-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </form>

                </section>


                {/* Account */}

                <section className="profile-section account-section">

                    <h2>Account</h2>

                    {!showPasswordForm && (
                        <button
                            type="button"
                            className="account-btn"
                            onClick={() => {
                                setShowPasswordForm(true);
                                setPasswordMessage("");
                                setPasswordError("");
                            }}
                        >
                            🔐 Change Password
                        </button>
                    )}

                    {showPasswordForm && (

                        <form
                            className="password-form"
                            onSubmit={handleChangePassword}
                        >

                            <div className="form-group">

                                <label htmlFor="currentPassword">
                                    Current Password
                                </label>

                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    value={
                                        passwordData.currentPassword
                                    }
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label htmlFor="newPassword">
                                    New Password
                                </label>

                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={
                                        passwordData.newPassword
                                    }
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label htmlFor="confirmPassword">
                                    Confirm New Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={
                                        passwordData.confirmPassword
                                    }
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    required
                                />

                            </div>


                            {passwordMessage && (
                                <p className="success-message">
                                    ✓ {passwordMessage}
                                </p>
                            )}


                            {passwordError && (
                                <p className="error-message">
                                    {passwordError}
                                </p>
                            )}


                            <button
                                type="submit"
                                className="save-profile-btn"
                                disabled={changingPassword}
                            >
                                {changingPassword
                                    ? "Changing..."
                                    : "Change Password"}
                            </button>


                            <button
                                type="button"
                                className="cancel-password-btn"
                                onClick={() => {
                                    setShowPasswordForm(false);

                                    setPasswordData({
                                        currentPassword: "",
                                        newPassword: "",
                                        confirmPassword: "",
                                    });

                                    setPasswordMessage("");
                                    setPasswordError("");
                                }}
                            >
                                Cancel
                            </button>

                        </form>

                    )}


                    <button
                        type="button"
                        className="logout-profile-btn"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Profile;