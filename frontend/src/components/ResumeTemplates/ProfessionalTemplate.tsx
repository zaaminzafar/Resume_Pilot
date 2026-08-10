import "../../styles/ResumeTemplates/ProfessionalTemplate.css";

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

function ProfessionalTemplate({
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
        <div className="professional-template">

            <header className="professional-header">

                <div>
                    <h1>{fullName || "Your Name"}</h1>

                    <p className="professional-title">
                        Software Developer
                    </p>
                </div>

                <div className="professional-contact">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{address}</p>

                    {github && <p>{github}</p>}
                    {linkedin && <p>{linkedin}</p>}
                </div>

            </header>

            <div className="professional-line" />

            <main>

                {summary && (
                    <section>
                        <h2>PROFILE</h2>
                        <p>{summary}</p>
                    </section>
                )}

                {experience && (
                    <section>
                        <h2>EXPERIENCE</h2>
                        <p>{experience}</p>
                    </section>
                )}

                {projects && (
                    <section>
                        <h2>PROJECTS</h2>
                        <p>{projects}</p>
                    </section>
                )}

                <div className="professional-columns">

                    {education && (
                        <section>
                            <h2>EDUCATION</h2>
                            <p>{education}</p>
                        </section>
                    )}

                    {skills && (
                        <section>
                            <h2>SKILLS</h2>
                            <p>{skills}</p>
                        </section>
                    )}

                </div>

                {certifications && (
                    <section>
                        <h2>CERTIFICATIONS</h2>
                        <p>{certifications}</p>
                    </section>
                )}

            </main>

        </div>
    );
}

export default ProfessionalTemplate;