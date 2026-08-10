import "../../styles/ResumeTemplates/ATSResume.css";

interface ResumeProps {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    certifications: string;
    github: string;
    linkedin: string;
}

function ATSResume({
    fullName,
    email,
    phone,
    address,
    summary,
    skills,
    experience,
    projects,
    education,
    certifications,
    github,
    linkedin,
}: ResumeProps) {
    return (
        <div className="ats-resume">

            <header className="ats-header">

                <h1>{fullName || "Your Name"}</h1>

                <h3>Software Developer</h3>

                <div className="contact-info">

                    <span>{email}</span>

                    <span>{phone}</span>

                    <span>{address}</span>

                </div>

                <div className="contact-links">

                    <span>{github}</span>

                    <span>{linkedin}</span>

                </div>

            </header>

            <section className="resume-section">
                <h2>PROFESSIONAL SUMMARY</h2>

                <p>{summary}</p>
            </section>

            <section className="resume-section">

                <h2>TECHNICAL SKILLS</h2>

                <div className="skills-container">

                    {skills
                        .split(",")
                        .filter(skill => skill.trim())
                        .map((skill, index) => (

                            <span
                                key={index}
                                className="skill-badge"
                            >
                                {skill.trim()}
                            </span>

                        ))}

                </div>

            </section>

            <section className="resume-section">

                <h2>EXPERIENCE</h2>

                <div className="experience-card">

                    <p>{experience}</p>

                </div>

            </section>

            <section className="resume-section">

                <h2>PROJECTS</h2>

                <div className="project-card">

                    <p>{projects}</p>

                </div>

            </section>

            <section className="resume-section">

                <h2>CERTIFICATIONS</h2>

                <p>{certifications}</p>

            </section>

            <section className="resume-section">

                <h2>EDUCATION</h2>

                <p>{education}</p>

            </section>

        </div>
    );
}

export default ATSResume;