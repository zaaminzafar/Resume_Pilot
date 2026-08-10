import html2pdf from "html2pdf.js";

import ATSResume from "../components/ResumeTemplates/ATSResume";
import ProfessionalTemplate from "../components/ResumeTemplates/ProfessionalTemplate";
import ModernTemplate from "../components/ResumeTemplates/ModernTemplate";
import MinimalTemplate from "../components/ResumeTemplates/MinimalTemplate";
import CreativeTemplate from "../components/ResumeTemplates/CreativeTemplate";

import "../styles/ResumeForm.css";
import { useEffect, useRef, useState } from "react";

interface Resume {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    skills: string;
    education: string;
}

function ResumeForm() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [selectedTemplate] = useState(
        localStorage.getItem("selectedTemplate") || "professional"
    );
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [skills, setSkills] = useState("");
    const [education, setEducation] = useState("");
    const [summary, setSummary] = useState("");
    const [experience, setExperience] = useState("");
    const [projects, setProjects] = useState("");
    const [certifications, setCertifications] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const [resumes, setResumes] = useState<Resume[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);

    const [buttonText, setButtonText] = useState("Save Resume");

    const fetchResumes = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/api/resumes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            console.log(data); // Check what the backend returns

            setResumes(Array.isArray(data) ? data : []);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    function handleEdit(resume: Resume) {
        setEditingId(resume.id);

        setFullName(resume.full_name);
        setEmail(resume.email);
        setPhone(resume.phone);
        setAddress(resume.address);
        setSkills(resume.skills);
        setEducation(resume.education);

        setButtonText("Update Resume");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const url = editingId
                ? `http://localhost:5000/api/resumes/${editingId}`
                : "http://localhost:5000/api/resumes";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    address,
                    skills,
                    education,
                }),
            });

            const data = await response.json();

            alert(data.message);

            if (response.ok) {
                setFullName("");
                setEmail("");
                setPhone("");
                setAddress("");
                setSkills("");
                setEducation("");

                setEditingId(null);

                setButtonText("Save Resume");

                fetchResumes();
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id: number) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/resumes/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            alert(data.message);

            fetchResumes();

        } catch (error) {
            console.log(error);
        }
    }

    // const downloadPDF = () => {
    //     if (!resumeRef.current) return;

    //     const options = {
    //         margin: 0,
    //         filename: `${fullName || "Resume"}.pdf`,

    //         image: {
    //             type: "jpeg" as const,
    //             quality: 1,
    //         },

    //         html2canvas: {
    //             scale: 2,
    //             useCORS: true,
    //             scrollY: 0,
    //             backgroundColor: "#ffffff",
    //         },

    //         jsPDF: {
    //             unit: "mm",
    //             format: "a4",
    //             orientation: "portrait",
    //         },

    //         pagebreak: {
    //             mode: [],
    //         },
    //     };

    //     (html2pdf() as any)
    //         .set(options)
    //         .from(resumeRef.current)
    //         .save();
    // };


   const downloadPDF = () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;

    const options = {
        margin: 0,

        filename: `${fullName || "Resume"}.pdf`,

        image: {
            type: "jpeg" as const,
            quality: 1,
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            backgroundColor: "#ffffff",
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
        },

        pagebreak: {
            mode: [],
        },
    };

    (html2pdf() as any)
        .set(options)
        .from(element)
        .save();
};

    return (

        <div className="container">
            <form className="resume-form" onSubmit={handleSubmit}>

                <h1 className="title">Resume Builder</h1>

                <label>Full Name</label>
                <input
                    className="input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <label>Email</label>
                <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Phone</label>
                <input
                    className="input"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label>Address</label>
                <textarea
                    className="input"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label>Professional Summary</label>
                <textarea
                    className="input"
                    rows={4}
                    placeholder="Write a short professional summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />

                <label>Experience</label>
                <textarea
                    className="input"
                    rows={4}
                    placeholder="Enter your work experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                />

                <label>Projects</label>
                <textarea
                    className="input"
                    rows={4}
                    placeholder="Describe your projects"
                    value={projects}
                    onChange={(e) => setProjects(e.target.value)}
                />

                <label>GitHub</label>
                <input
                    className="input"
                    type="text"
                    placeholder="https://github.com/username"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />

                <label>LinkedIn</label>
                <input
                    className="input"
                    type="text"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />

                <label>Certifications</label>
                <textarea
                    className="input"
                    rows={3}
                    placeholder="AWS, Google, Microsoft..."
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                />

                <label>Skills</label>
                <textarea
                    className="input"
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />

                <label>Education</label>

                <textarea
                    className="input"
                    rows={4}
                    placeholder="Enter your education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                ></textarea>

                <button className="save-btn" type="submit">
                    {buttonText}
                </button>

                <hr />

                <h2>Resume Preview</h2>

                <div
                    className="preview-container">
                    {/* ref={resumeRef} */}
                    <div
                        ref={resumeRef}
                        className="resume-pdf"
                    >

                        {selectedTemplate === "ats" && (
                            // <div ref={resumeRef}>
                            <ATSResume
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                address={address}
                                summary={summary}
                                skills={skills}
                                experience={experience}
                                projects={projects}
                                education={education}
                                certifications={certifications}
                                github={github}
                                linkedin={linkedin}
                            />
                            // </div>
                        )}

                        {selectedTemplate === "professional" && (
                            <ProfessionalTemplate
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                address={address}
                                summary={summary}
                                skills={skills}
                                experience={experience}
                                projects={projects}
                                education={education}
                                certifications={certifications}
                                github={github}
                                linkedin={linkedin}
                            />
                        )}

                        {selectedTemplate === "modern" && (
                            <ModernTemplate
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                address={address}
                                summary={summary}
                                skills={skills}
                                experience={experience}
                                projects={projects}
                                education={education}
                                certifications={certifications}
                                github={github}
                                linkedin={linkedin}
                            />
                        )}

                        {selectedTemplate === "creative" && (
                            <CreativeTemplate
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                address={address}
                                summary={summary}
                                skills={skills}
                                experience={experience}
                                projects={projects}
                                education={education}
                                certifications={certifications}
                                github={github}
                                linkedin={linkedin}
                            />
                        )}

                        {selectedTemplate === "minimal" && (
                            <MinimalTemplate
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                address={address}
                                summary={summary}
                                skills={skills}
                                experience={experience}
                                projects={projects}
                                education={education}
                                certifications={certifications}
                                github={github}
                                linkedin={linkedin}
                            />
                        )}
                    </div>

                </div>

                <button
                    className="download-btn"
                    type="button"
                    onClick={downloadPDF}
                >
                    Download PDF
                </button>

                <hr />

                <h2>Saved Resumes</h2>

                {resumes.length === 0 ? (
                    <p>No resumes found.</p>
                ) : (
                    resumes.map((resume) => (
                        <div className="resume-card" key={resume.id}>

                            <h3>{resume.full_name}</h3>

                            <p><strong>Email:</strong> {resume.email}</p>

                            <p><strong>Phone:</strong> {resume.phone}</p>

                            <p><strong>Address:</strong> {resume.address}</p>

                            <p><strong>Skills:</strong> {resume.skills}</p>

                            <p><strong>Education:</strong> {resume.education}</p>

                            <button
                                type="button"
                                className="edit-btn"
                                onClick={() => handleEdit(resume)}
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDelete(resume.id)}
                            >
                                Delete
                            </button>

                            <hr />

                        </div>
                    ))
                )}

            </form>
        </div>
    );
}

export default ResumeForm;