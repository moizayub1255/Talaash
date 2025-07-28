import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const CVBuilder = () => {
  const cvRef = useRef();
  const [cvData, setCvData] = useState({
    profilePic: "https://via.placeholder.com/150",
    name: "Your Name",
    title: "Teacher CV",
    profileSummaryHeading: "Profile Summary",
    profileSummary: `Experienced teacher with over 7 years in the field of education. Skilled in classroom management, curriculum design, and student engagement. Passionate about helping students reach their full potential.`,

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

  const { user } = useUser();

  const handleDownloadPDF = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to download and save your CV.");
      return;
    }
    html2canvas(cvRef.current).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      // Get PDF as base64
      const pdfBase64 = pdf.output("datauristring");
      // Send CV data + PDF to backend
      try {
        const payload = { ...cvData, pdfBase64, userId: user.id };
        console.log('Sending CV to backend:', payload);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json();
          toast.error("Failed to save CV: " + (errorData.error || response.statusText));
          return;
        }
        toast.success("CV saved successfully!");
        // Only download if save succeeded
        pdf.save("My_CV.pdf");
      } catch (error) {
        console.error("Failed to save CV data:", error);
        toast.error("Failed to save CV data. Please try again.");
      }
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
    <div className="container my-5">
      <div
        ref={cvRef}
        className="d-flex cv-wrapper"
        style={{
          width: "794px",
          minHeight: "1123px",
          margin: "auto",
          fontFamily: "Arial, sans-serif",
          boxShadow: "none",
          backgroundColor: "transparent",
          border: "2px solid #bbb",
          borderRadius: "12px",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
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
          {/* <textarea
            rows="4"
            value={cvData.profileSummary}
            onChange={(e) => handleChange("profileSummary", e.target.value)}
            style={{
              overflow: "visible",
              resize: "none",
              height: "auto",
              minHeight: "1rem",
              width: "100%",
              fontSize: "1rem",
              border: "none",
              background: "none",
              outline: "none",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          /> */}

          <div
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleChange("profileSummary", e.target.innerText)}
            style={{
              minHeight: "80px",
              fontSize: "1rem",
              marginBottom: "24px",
              outline: "none",
              whiteSpace: "pre-wrap",
              width: "100%",
            }}
          >
            {cvData.profileSummary}
          </div>

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
            onChange={(e) => handleChange("experienceHeading", e.target.value)}
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
              {/* <textarea
                value={exp.description}
                onChange={(e) => {
                  const updated = { ...exp, description: e.target.value };
                  handleNestedChange("experience", i, updated);
                }}
                style={{
                  overflow: "visible",
                  resize: "none",
                  height: "auto",
                  minHeight: "1rem",
                  width: "100%",
                  fontSize: "1rem",
                  border: "none",
                  background: "none",
                  outline: "none",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              /> */}

              <div
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  const updated = { ...exp, description: e.target.innerText };
                  handleNestedChange("experience", i, updated);
                }}
                style={{
                  minHeight: "80px",
                  fontSize: "1rem",
                  marginBottom: "24px",
                  outline: "none",
                  whiteSpace: "pre-wrap",
                  width: "100%",
                }}
              >
                {exp.description}
              </div>
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
  );
};

export default CVBuilder;
