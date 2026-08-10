import "../../styles/ResumeTemplates/MinimalTemplate.css";

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

function MinimalTemplate({
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
        <div className="minimal-template">

            <header className="minimal-header">

                <h1>{fullName || "Your Name"}</h1>

                <div className="minimal-contact">
                    <span>{email}</span>
                    <span>{phone}</span>
                    <span>{address}</span>
                </div>

                <div className="minimal-links">
                    {github && <span>{github}</span>}
                    {linkedin && <span>{linkedin}</span>}
                </div>

            </header>

            <div className="minimal-content">

                {summary && (
                    <section className="minimal-section">
                        <h2>About</h2>
                        <p>{summary}</p>
                    </section>
                )}

                {experience && (
                    <section className="minimal-section">
                        <h2>Experience</h2>
                        <p>{experience}</p>
                    </section>
                )}

                {projects && (
                    <section className="minimal-section">
                        <h2>Projects</h2>
                        <p>{projects}</p>
                    </section>
                )}

                <div className="minimal-grid">

                    {education && (
                        <section className="minimal-section">
                            <h2>Education</h2>
                            <p>{education}</p>
                        </section>
                    )}

                    {skills && (
                        <section className="minimal-section">
                            <h2>Skills</h2>
                            <p>{skills}</p>
                        </section>
                    )}

                </div>

                {certifications && (
                    <section className="minimal-section">
                        <h2>Certifications</h2>
                        <p>{certifications}</p>
                    </section>
                )}

            </div>

        </div>
    );
}

export default MinimalTemplate;