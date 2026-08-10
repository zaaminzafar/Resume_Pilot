import "../../styles/ResumeTemplates/ModernTemplate.css";

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

function ModernTemplate({
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
        <div className="modern-template">

            <aside className="modern-sidebar">

                <div className="modern-avatar">
                    {fullName
                        ? fullName.charAt(0).toUpperCase()
                        : "R"}
                </div>

                <h2>{fullName || "Your Name"}</h2>

                <div className="modern-contact">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{address}</p>
                </div>

                {skills && (
                    <section>
                        <h3>SKILLS</h3>
                        <p>{skills}</p>
                    </section>
                )}

                {certifications && (
                    <section>
                        <h3>CERTIFICATIONS</h3>
                        <p>{certifications}</p>
                    </section>
                )}

                {github && (
                    <section>
                        <h3>GITHUB</h3>
                        <p>{github}</p>
                    </section>
                )}

                {linkedin && (
                    <section>
                        <h3>LINKEDIN</h3>
                        <p>{linkedin}</p>
                    </section>
                )}

            </aside>


            <main className="modern-main">

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

                {education && (
                    <section>
                        <h2>Education</h2>
                        <p>{education}</p>
                    </section>
                )}

            </main>

        </div>
    );
}

export default ModernTemplate;