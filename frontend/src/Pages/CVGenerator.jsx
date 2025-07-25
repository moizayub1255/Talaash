import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Headandfoot from "./components/Headandfoot";
import Avatar from "../components/UI/Avatar";
import Range from "../components/UI/Range";
import Title from "../components/UI/Title";
import Descr from "../components/UI/Descr";

const CVGenerator = () => {
  const [skillsCounter, setSkillsCounter] = useState(1);
  const [worksCounter, setWorksCounter] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const componentRef = useRef();

  const handlePrintClick = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Headandfoot />
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        {/* Print button outside printable area */}
        <button onClick={handlePrintClick} style={{ marginBottom: "1rem" }}>
          Print
        </button>
      </div>
      <div
        ref={componentRef}
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: "3rem 2rem",
          backgroundColor: "white",
          border: "1px solid #ececec",
          boxShadow: "5px 7px 10px 4px #ececec",
          borderRadius: "14px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            margin: "2rem 0",
          }}
        >
          <div style={{ flex: 1, marginRight: "1rem" }}>
            <Avatar value={avatar} onChange={setAvatar} />
          </div>
          <div style={{ flex: 3, marginLeft: "1rem" }}>
            <Title>Nick Gerner</Title>
            <Descr>
              Experienced Software & Machine Learning Engineer with a
              demonstrated history.
            </Descr>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", margin: "2rem 0" }}>
          <div style={{ flex: 1, marginRight: "1rem" }}>
            <Title size="3" isUppercase>
              About me:
            </Title>
            <Descr>Software Engineer</Descr>
            <Descr isSecondary>Washington, DC | tocode.ru</Descr>
            <Descr isPrimary style={{ marginTop: "2rem" }}>
              <span role="img" aria-label="email">
                📧
              </span>{" "}
              nick@gmail.com
            </Descr>
            <Descr isPrimary>
              <span role="img" aria-label="phone">
                📞
              </span>{" "}
              +1 588-6500
            </Descr>
          </div>
          <div style={{ flex: 3, marginLeft: "1rem" }}>
            <Title size="3" isUppercase>
              Education:
            </Title>
            <Descr>Stanford University - BS Electrical Engineering</Descr>
            <Title
              size="3"
              isUppercase
              isShowButton
              onClick={() => setWorksCounter(worksCounter + 1)}
              style={{ marginTop: "3.6rem" }}
            >
              Work experience:
            </Title>
            {Array.from({ length: worksCounter }).map((_, i) => (
              <Descr key={i}>{i + 1}. Solutions Architect, Stripe.</Descr>
            ))}
            <Title
              size="3"
              isUppercase
              isShowButton
              onClick={() => setSkillsCounter(skillsCounter + 1)}
              style={{ marginTop: "3rem" }}
            >
              Skills:
            </Title>
            {Array.from({ length: skillsCounter }).map((_, i) => (
              <Range key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CVGenerator;
