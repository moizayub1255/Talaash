import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const CVBuilder = () => {
  const cvRef = useRef();
  const [cvData, setCvData] = useState({
    profilePic: "https://via.placeholder.com/150",
    name: "RS-IDEA",
    title: "MARKETING MANAGER",
    profileSummaryHeading: "PERSONAL SUMMARY",
    profileSummary: `I'm an experienced store manager with a keen eye for trends and a passion for the retail industry. I put customer satisfaction first, always.`,

    contactHeading: "CONTACT",
    contact: {
      address: "123 Anywhere St., Any City, State, Country 12345",
      phone: "+123 456 7890",
      email: "hello@WPS.com",
    },
    keySkillsHeading: "SKILLS",
    keySkills: [
      "Analytical thinking, planning",
      "Strong communication",
      "Tolerant and flexible",
      "Organization and prioritization",
      "Problem solving",
      "Team leadership",
    ],
    technicalSkillsHeading: "INTERESTS",
    technicalSkills: [
      "Creating Organizational",
      "Development Programs for micro and small enterprises",
      "Hosting personal development workshops",
      "Traveling and Mountain Climbing",
    ],
    educationHeading: "EDUCATION",
    education: [
      {
        degree: "Bachelor of Arts / Finance",
        year: "2013 – 2015",
        institution: "Brown University St. Providence, RI",
      },
      {
        degree: "Associate of Arts / Business",
        year: "2011 - 2013",
        institution: "San Antonio City College, TX",
      },
    ],
    experienceHeading: "WORK EXPERIENCE",
    experience: [
      {
        role: "Marketing",
        institution: "CKAT Mega Corporation",
        duration: "2018 - Present",
        description:
          "Handles the company's online presence and keeps social platforms updated\nMonitors ongoing marketing campaigns\nPrepares client presentations",
      },
      {
        role: "Marketing Assistant",
        institution: "Kyobi Marketing Solutions",
        duration: "2015 - 2018",
        description:
          "Managed & organized files\nUpdated the company's mailing list\nMonitored marketing campaigns & press coverage\nUpdated the company website",
      },
    ],
  });

  const { user } = useUser();

  const handleDownloadPDF = () => {
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
        style={{
          width: "794px",
          minHeight: "1123px",
          margin: "auto",
          fontFamily: "Arial, sans-serif",
          border: "2px solid #ccc",
          borderRadius: "10px",
          background: "#fff",
          padding: "30px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <label htmlFor="imageUpload">
            <img
              src={cvData.profilePic}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "50%",
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
          <h2 contentEditable suppressContentEditableWarning>
            {cvData.name}
          </h2>
          <h4 contentEditable suppressContentEditableWarning>
            {cvData.title}
          </h4>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <h5 contentEditable suppressContentEditableWarning>
              {cvData.profileSummaryHeading}
            </h5>
            <p contentEditable suppressContentEditableWarning>
              {cvData.profileSummary}
            </p>

            <h5 contentEditable suppressContentEditableWarning>
              {cvData.contactHeading}
            </h5>
            <p contentEditable suppressContentEditableWarning>
              {cvData.contact.phone}
            </p>
            <p contentEditable suppressContentEditableWarning>
              {cvData.contact.address}
            </p>
            <p contentEditable suppressContentEditableWarning>
              {cvData.contact.email}
            </p>

            <h5 contentEditable suppressContentEditableWarning>
              {cvData.educationHeading}
            </h5>
            {cvData.education.map((edu, i) => (
              <div key={i}>
                <p
                  contentEditable
                  suppressContentEditableWarning
                >{`${edu.degree}, ${edu.institution}, ${edu.year}`}</p>
              </div>
            ))}
          </div>

          <div style={{ width: "48%" }}>
            <h5 contentEditable suppressContentEditableWarning>
              {cvData.experienceHeading}
            </h5>
            {cvData.experience.map((exp, i) => (
              <div key={i}>
                <strong contentEditable suppressContentEditableWarning>
                  {exp.role} - {exp.institution} ({exp.duration})
                </strong>
                <p contentEditable suppressContentEditableWarning>
                  {exp.description}
                </p>
              </div>
            ))}

            <h5 contentEditable suppressContentEditableWarning>
              {cvData.technicalSkillsHeading}
            </h5>
            {cvData.technicalSkills.map((skill, i) => (
              <p key={i} contentEditable suppressContentEditableWarning>
                • {skill}
              </p>
            ))}

            <h5 contentEditable suppressContentEditableWarning>
              {cvData.keySkillsHeading}
            </h5>
            {cvData.keySkills.map((skill, i) => (
              <p key={i} contentEditable suppressContentEditableWarning>
                • {skill}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CVBuilder;
