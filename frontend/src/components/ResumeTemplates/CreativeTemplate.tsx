import "../../styles/ResumeTemplates/CreativeTemplate.css";

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

function CreativeTemplate({
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
        <div className="creative-template">

            <header className="creative-header">

                <div className="creative-name">
                    <span>HELLO, I'M</span>
                    <h1>{fullName || "Your Name"}</h1>
                    <h3>SOFTWARE DEVELOPER</h3>
                </div>

                <div className="creative-contact">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{address}</p>
                </div>

            </header>

            <div className="creative-layout">

                <aside className="creative-sidebar">

                    {skills && (
                        <section>
                            <h2>Skills</h2>
                            <p>{skills}</p>
                        </section>
                    )}

                    {education && (
                        <section>
                            <h2>Education</h2>
                            <p>{education}</p>
                        </section>
                    )}

                    {certifications && (
                        <section>
                            <h2>Certifications</h2>
                            <p>{certifications}</p>
                        </section>
                    )}

                    {github && (
                        <section>
                            <h2>GitHub</h2>
                            <p>{github}</p>
                        </section>
                    )}

                    {linkedin && (
                        <section>
                            <h2>LinkedIn</h2>
                            <p>{linkedin}</p>
                        </section>
                    )}

                </aside>

                <main className="creative-main">

                    {summary && (
                        <section>
                            <h2>Profile</h2>
                            <p>{summary}</p>
                        </section>
                    )}

                    {experience && (
                        <section>
                            <h2>Experience</h2>
                            <p>{experience}</p>
                        </section>
                    )}

                    {projects && (
                        <section>
                            <h2>Projects</h2>
                            <p>{projects}</p>
                        </section>
                    )}

                </main>

            </div>

        </div>
    );
}

export default CreativeTemplate;