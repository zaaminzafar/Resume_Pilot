import { useNavigate } from "react-router-dom";
import "../styles/Templates.css";

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    color: string;
}

const templates: Template[] = [
    {
        id: "ats",
        name: "ATS Professional",
        description: "Clean and optimized for Applicant Tracking Systems.",
        category: "ATS Friendly",
        color: "#006241",
    },
    {
        id: "professional",
        name: "Professional",
        description: "A polished corporate layout for professional applications.",
        category: "Corporate",
        color: "#183b56",
    },
    {
        id: "modern",
        name: "Modern",
        description: "A stylish two-column design with a profile photo.",
        category: "Modern",
        color: "#123c35",
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Simple typography and whitespace for an elegant resume.",
        category: "Minimal",
        color: "#444",
    },
    {
        id: "creative",
        name: "Creative",
        description: "A bold layout for developers, designers and creatives.",
        category: "Creative",
        color: "#171717",
    },
];

function Templates() {
    const navigate = useNavigate();

    function selectTemplate(template: string) {
        localStorage.setItem("selectedTemplate", template);

        navigate("/resume");
    }

    return (
        <div className="templates-page">

            <div className="templates-hero">

                <span className="templates-label">
                    RESUME BUILDER
                </span>

                <h1>
                    Choose a Resume Template
                </h1>

                <p>
                    Start with a professionally designed template and
                    customize it with your information.
                </p>

            </div>


            <div className="templates-container">

                <div className="templates-topbar">

                    <div>
                        <h2>Resume Templates</h2>
                        <p>
                            Choose the style that best represents you.
                        </p>
                    </div>

                    <span className="template-count">
                        {templates.length} Templates
                    </span>

                </div>


                <div className="templates-grid">

                    {templates.map((template) => (

                        <div
                            className="template-card"
                            key={template.id}
                        >

                            {/* Preview */}

                            <div
                                className={`template-preview preview-${template.id}`}
                            >

                                <div className="mini-resume">

                                    <div className="mini-header">

                                        <div className="mini-name">
                                            YOUR NAME
                                        </div>

                                        <div className="mini-contact">
                                            email@example.com
                                        </div>

                                    </div>


                                    <div className="mini-body">

                                        <div className="mini-line title" />

                                        <div className="mini-line" />
                                        <div className="mini-line short" />

                                        <div className="mini-section-title">
                                            EXPERIENCE
                                        </div>

                                        <div className="mini-line" />
                                        <div className="mini-line" />
                                        <div className="mini-line short" />

                                        <div className="mini-section-title">
                                            PROJECTS
                                        </div>

                                        <div className="mini-line" />
                                        <div className="mini-line short" />

                                        <div className="mini-section-title">
                                            EDUCATION
                                        </div>

                                        <div className="mini-line" />

                                    </div>

                                </div>

                            </div>


                            {/* Information */}

                            <div className="template-info">

                                <div className="template-title-row">

                                    <h3>
                                        {template.name}
                                    </h3>

                                    <span
                                        className="template-badge"
                                        style={{
                                            color: template.color,
                                        }}
                                    >
                                        {template.category}
                                    </span>

                                </div>

                                <p>
                                    {template.description}
                                </p>


                                <button
                                    className="use-template-btn"
                                    onClick={() =>
                                        selectTemplate(template.id)
                                    }
                                >
                                    Use This Template
                                    <span>→</span>
                                </button>

                            </div>

                        </div>

                    ))}


                </div>

            </div>

        </div>
        
    );
}

export default Templates;