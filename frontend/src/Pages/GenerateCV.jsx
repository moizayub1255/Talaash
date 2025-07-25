import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import "bootstrap/dist/css/bootstrap.min.css";
import Headandfoot from "./components/Headandfoot";

const CVBuilder = () => {
  const cvRef = useRef();
  const [cvData, setCvData] = useState({
    profilePic: "https://via.placeholder.com/150",
    name: "Your Name",
    title: "Teacher CV",
    profileSummaryHeading: "Profile Summary",
    profileSummary: "Write your profile summary here...",
    contactHeading: "Contact",
    contact: {
      address: "Your Address",
      phone: "123-456-7890",
      email: "you@example.com",
    },
    keySkillsHeading: "Key Skills",
    keySkills: [
      "Communication",
      "Classroom Management",
      "Meetings",
      "Class Tests",
    ],
    technicalSkillsHeading: "Technical Skills",
    technicalSkills: [
      "Microsoft Office",
      "Online Teaching Tools",
      "Classroom Technology",
      "Microsoft Teams",
    ],
    educationHeading: "Education",
    education: [
      {
        degree: "Bachelor of Education",
        year: "2014 - 2017",
        institution: "Your University",
      },
      {
        degree: "Master of Arts in Teaching (MAT)",
        year: "2017 - 2019",
        institution: "Your University",
      },
    ],
    experienceHeading: "Teaching Experience",
    experience: [
      {
        role: "High School Teacher",
        institution: "Greenfield High School",
        duration: "2019 - Present",
        description: "Write your experience description here...",
      },
    ],
  });

  const handleDownloadPDF = () => {
    html2canvas(cvRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("My_CV.pdf");
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData({ ...cvData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    setCvData({ ...cvData, [field]: value });
  };

  const handleNestedChange = (section, index, value) => {
    const updated = [...cvData[section]];
    updated[index] = value;
    setCvData({ ...cvData, [section]: updated });
  };

  return (
    <Headandfoot>
      <div className="container my-5">
        <div
          ref={cvRef}
          className="d-flex"
          style={{
            maxWidth: "900px",
            margin: "auto",
            fontFamily: "Arial, sans-serif",
            boxShadow: "none",
            backgroundColor: "transparent",
            border: "2px solid #bbb",
            borderRadius: "12px",
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              backgroundColor: "#e3f2fd",
              padding: "30px",
              width: "35%",
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
            }}
          >
            <label htmlFor="imageUpload">
              <img
                src={cvData.profilePic}
                alt="Profile"
                style={{
                  width: "100%",
                  borderRadius: "50%",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <input
              value={cvData.contactHeading}
              onChange={(e) => handleChange("contactHeading", e.target.value)}
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "8px",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />
            <input
              value={cvData.contact.address}
              onChange={(e) =>
                handleChange("contact", {
                  ...cvData.contact,
                  address: e.target.value,
                })
              }
              style={{
                marginBottom: "8px",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />
            <input
              value={cvData.contact.phone}
              onChange={(e) =>
                handleChange("contact", {
                  ...cvData.contact,
                  phone: e.target.value,
                })
              }
              style={{
                marginBottom: "8px",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />
            <input
              value={cvData.contact.email}
              onChange={(e) =>
                handleChange("contact", {
                  ...cvData.contact,
                  email: e.target.value,
                })
              }
              style={{
                marginBottom: "16px",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />

            <input
              value={cvData.keySkillsHeading}
              onChange={(e) => handleChange("keySkillsHeading", e.target.value)}
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "8px",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />
            {cvData.keySkills.map((skill, i) => (
              <input
                key={i}
                value={skill}
                onChange={(e) =>
                  handleNestedChange("keySkills", i, e.target.value)
                }
                style={{
                  marginBottom: "4px",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              />
            ))}

            <input
              value={cvData.technicalSkillsHeading}
              onChange={(e) =>
                handleChange("technicalSkillsHeading", e.target.value)
              }
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                margin: "16px 0 8px 0",
                background: "none",
                border: "none",
                outline: "none",
              }}
            />
            {cvData.technicalSkills.map((skill, i) => (
              <input
                key={i}
                value={skill}
                onChange={(e) =>
                  handleNestedChange("technicalSkills", i, e.target.value)
                }
                style={{
                  marginBottom: "4px",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              />
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              padding: "30px",
              width: "65%",
              background: "#fff",
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            <input
              value={cvData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "16px",
                background: "none",
                border: "none",
                outline: "none",
                padding: "4px 0",
              }}
            />
            <input
              value={cvData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              style={{
                fontStyle: "italic",
                marginBottom: "24px",
                background: "none",
                border: "none",
                outline: "none",
                padding: "4px 0",
              }}
            />
            <hr />
            <input
              value={cvData.profileSummaryHeading}
              onChange={(e) =>
                handleChange("profileSummaryHeading", e.target.value)
              }
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "12px",
                background: "none",
                border: "none",
                outline: "none",
                padding: "4px 0",
              }}
            />
            <textarea
              rows="4"
              value={cvData.profileSummary}
              onChange={(e) => handleChange("profileSummary", e.target.value)}
              style={{
                marginBottom: "24px",
                background: "none",
                border: "none",
                outline: "none",
                padding: "6px 0",
                minHeight: "32px",
                fontSize: "1rem",
                width: "100%",
                resize: "none",
                overflow: "visible",
                boxSizing: "border-box",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />

            <input
              value={cvData.educationHeading}
              onChange={(e) => handleChange("educationHeading", e.target.value)}
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "12px",
                background: "none",
                border: "none",
                outline: "none",
                padding: "4px 0",
              }}
            />
            {cvData.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <input
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = { ...edu, degree: e.target.value };
                    handleNestedChange("education", i, updated);
                  }}
                  style={{
                    marginBottom: "4px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "2px 0",
                  }}
                />
                <input
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = { ...edu, institution: e.target.value };
                    handleNestedChange("education", i, updated);
                  }}
                  style={{
                    marginBottom: "4px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "2px 0",
                  }}
                />
                <input
                  value={edu.year}
                  onChange={(e) => {
                    const updated = { ...edu, year: e.target.value };
                    handleNestedChange("education", i, updated);
                  }}
                  style={{
                    marginBottom: "8px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "2px 0",
                  }}
                />
              </div>
            ))}

            <input
              value={cvData.experienceHeading}
              onChange={(e) =>
                handleChange("experienceHeading", e.target.value)
              }
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "12px",
                background: "none",
                border: "none",
                outline: "none",
                padding: "4px 0",
              }}
            />
            {cvData.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <input
                  value={exp.role}
                  onChange={(e) => {
                    const updated = { ...exp, role: e.target.value };
                    handleNestedChange("experience", i, updated);
                  }}
                  style={{
                    marginBottom: "4px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "2px 0",
                  }}
                />
                <input
                  value={exp.institution}
                  onChange={(e) => {
                    const updated = { ...exp, institution: e.target.value };
                    handleNestedChange("experience", i, updated);
                  }}
                  style={{
                    marginBottom: "4px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "2px 0",
                  }}
                />
                <input
                  value={exp.duration}
                  onChange={(e) => {
                    const updated = { ...exp, duration: e.target.value };
                    handleNestedChange("experience", i, updated);
                  }}
                  style={{
                    marginBottom: "4px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "2px 0",
                  }}
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const updated = { ...exp, description: e.target.value };
                    handleNestedChange("experience", i, updated);
                  }}
                  style={{
                    marginBottom: "8px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "6px 0",
                    minHeight: "32px",
                    fontSize: "1rem",
                    width: "100%",
                    resize: "none",
                    overflow: "visible",
                    boxSizing: "border-box",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center m-4">
          <button className="btn btn-success" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </Headandfoot>
  );
};

export default CVBuilder;
