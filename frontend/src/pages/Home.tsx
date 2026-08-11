import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    return (
        <div className="home">

            {/* Hero Section */}
            <section className="hero">

                <div className="hero-left">

                    <h1>
                        Build Your Professional Resume
                    </h1>

                    <p>
                        Create ATS-friendly resumes with modern templates,
                        download as PDF and impress recruiters.
                    </p>

                    <button
                        className="hero-btn"
                        onClick={() =>
                            token ? navigate("/templates") : navigate("/login")
                        }
                    >
                        Create Resume
                    </button>

                </div>

                <div className="hero-right">

                    <img
                        src="/resume-preview.png"
                        alt="Resume Preview"
                        className="resume-preview"
                    />

                </div>

            </section>

            {/* Features Section */}
            <section className="features">

                <div className="feature-card">
                    <h3>📄 ATS Friendly</h3>
                    <p>
                        Optimized resumes that pass Applicant Tracking Systems.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>🎨 Modern Templates</h3>
                    <p>
                        Beautiful resume templates for every profession.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>📥 PDF Download</h3>
                    <p>
                        Download high-quality PDF resumes with one click.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>💾 Save & Edit</h3>
                    <p>
                        Save multiple resumes and edit them anytime.
                    </p>
                </div>

            </section>

            {/* Resume Banner */}
            <section className="resume-banner">

                <img
                    src="/resume-banner.png"
                    alt="Create your professional resume"
                />

            </section>

            {/* How It Works */}
            <section className="how-it-works">

                <h2>How It Works</h2>

                <p className="how-subtitle">
                    Create your professional resume in three simple steps.
                </p>

                <div className="steps">

                    <div className="step">

                        <div className="step-number">
                            01
                        </div>

                        <h3>Choose a Template</h3>

                        <p>
                            Select a professional resume template that matches
                            your career and style.
                        </p>

                    </div>

                    <div className="step">

                        <div className="step-number">
                            02
                        </div>

                        <h3>Fill Your Details</h3>

                        <p>
                            Add your personal information, skills, education,
                            experience and projects.
                        </p>

                    </div>

                    <div className="step">

                        <div className="step-number">
                            03
                        </div>

                        <h3>Download Your Resume</h3>

                        <p>
                            Preview your resume and download it as a professional
                            PDF with one click.
                        </p>

                    </div>

                </div>

            </section>

            {/* Footer */}
            <footer className="footer">

                <div className="footer-content">

                    <div className="footer-brand">

                        <h2>Resume Pilot</h2>

                        <p>
                            Create professional, ATS-friendly resumes
                            and take the next step in your career.
                        </p>

                    </div>

                    <div className="footer-links">

                        <h3>Quick Links</h3>

                        <button onClick={() => navigate("/")}> Home </button>

                        <button
                            onClick={() =>
                                token ? navigate("/templates") : navigate("/login")
                            }
                        >
                            Templates
                        </button>

                        <button
                            onClick={() =>
                                token ? navigate("/resume") : navigate("/login")
                            }
                        >
                            Create Resume
                        </button>

                    </div>

                </div>

                <div className="footer-bottom">

                    <p>
                        © 2026 Resume Pilot. All rights reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;