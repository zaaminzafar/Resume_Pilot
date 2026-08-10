import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">

            <main className="dashboard-main">

                {/* Welcome Section */}
                <section className="welcome-section">

                    <div>
                        <h1>Welcome back </h1>

                        <p>
                            Create, manage and improve your professional
                            resumes with Resume Pilot.
                        </p>
                    </div>

                    <button
                        className="create-btn"
                        onClick={() => navigate("/resume")}
                    >
                        + Create Resume
                    </button>

                </section>


                {/* Dashboard Cards */}
                <section className="dashboard-cards">

                    <div className="dashboard-card">

                        <div className="card-icon">
                            📄
                        </div>

                        <h2>Create Resume</h2>

                        <p>
                            Build a professional and ATS-friendly resume
                            using our templates.
                        </p>

                        <button
                            onClick={() => navigate("/resume")}
                        >
                            Create Resume
                        </button>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-icon">
                            🎨
                        </div>

                        <h2>Templates</h2>

                        <p>
                            Choose from professional, modern, minimal,
                            creative and ATS templates.
                        </p>

                        <button
                            onClick={() => navigate("/templates")}
                        >
                            View Templates
                        </button>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-icon">
                            📊
                        </div>

                        <h2>My Resumes</h2>

                        <p>
                            View and manage the resumes you have already
                            created and saved.
                        </p>

                        <button
                            onClick={() => navigate("/resume")}
                        >
                            View Resumes
                        </button>

                    </div>

                </section>

                {/* My Resumes */}
                <section className="my-resumes">

                    <div className="section-header">

                        <div>
                            <h2>My Resumes</h2>

                            <p>
                                Manage your saved resumes.
                            </p>
                        </div>

                        <button
                            className="view-all-btn"
                            onClick={() => navigate("/resume")}
                        >
                            Create New
                        </button>

                    </div>


                    <div className="resume-list">

                        {/* Resume Card */}
                        <div className="resume-card">

                            <div className="resume-card-info">

                                <div className="resume-icon">
                                    📄
                                </div>

                                <div>
                                    <h3>Software Developer Resume</h3>

                                    <p>
                                        ATS Template
                                    </p>

                                    <span>
                                        Recently created
                                    </span>
                                </div>

                            </div>


                            <div className="resume-actions">

                                <button
                                    className="edit-resume-btn"
                                    onClick={() => navigate("/resume")}
                                >
                                    Edit
                                </button>

                                <button
                                    className="download-resume-btn"
                                >
                                    Download
                                </button>

                                <button
                                    className="delete-resume-btn"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>


                        {/* Empty state example */}

                        {/* <div className="empty-resumes">

                            <div className="empty-icon">
                                📄
                            </div>

                            <h3>No resumes yet</h3>

                            <p>
                                Create your first professional resume.
                            </p>

                            <button onClick={() => navigate("/resume")}>
                                Create Resume
                            </button>

                        </div> */}


                    </div>

                </section>

            </main>

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

                        <button onClick={() => navigate("/")}>
                            Home
                        </button>

                        <button onClick={() => navigate("/templates")}>
                            Templates
                        </button>

                        <button onClick={() => navigate("/resume")}>
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

export default Dashboard;