import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

// Dummy Components (replace these with actual ones if needed)
const Header = ({ onClick }) => <button onClick={onClick}>Print</button>;
const Footer = () => <footer>Footer</footer>;
const Avatar = () => <div style={{ width: 100, height: 100, backgroundColor: '#ddd' }}>Avatar</div>;
const Range = () => <div style={{ margin: '0.5rem 0' }}>Skill: █████░░░░░</div>;
const Title = ({ children, size = '2', isUppercase, isShowButton, onClick, style }) => (
  <div style={{ margin: '1rem 0', ...style }}>
    <h2 style={{ fontSize: `${size}rem`, textTransform: isUppercase ? 'uppercase' : 'none' }}>
      {children}
      {isShowButton && <button style={{ marginLeft: '1rem' }} onClick={onClick}>+</button>}
    </h2>
  </div>
);
const Descr = ({ children, isPrimary, isSecondary, style }) => (
  <p
    style={{
      color: isPrimary ? 'blue' : isSecondary ? 'gray' : 'black',
      margin: '0.5rem 0',
      ...style,
    }}
  >
    {children}
  </p>
);

// Icons (replace with actual SVG or any placeholder for now)
const MailIcon = () => <span role="img" aria-label="email">📧</span>;
const PhoneIcon = () => <span role="img" aria-label="phone">📞</span>;

const Apps = () => {
  const [skillsCounter, setSkillsCounter] = useState(1);
  const [worksCounter, setWorksCounter] = useState(1);
  const componentRef = useRef();

  const handlePrintClick = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Header onClick={handlePrintClick} />

      <div ref={componentRef} style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '3rem 2rem',
        backgroundColor: 'white',
        border: '1px solid #ececec',
        boxShadow: '5px 7px 10px 4px #ececec',
        borderRadius: '14px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '2rem 0' }}>
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <Avatar />
          </div>
          <div style={{ flex: 3, marginLeft: '1rem' }}>
            <Title>Nick Gerner</Title>
            <Descr>Experienced Software & Machine Learning Engineer with a demonstrated history.</Descr>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '2rem 0' }}>
          <div style={{ flex: 1, marginRight: '1rem' }}>
            <Title size='3' isUppercase>About me:</Title>
            <Descr>Software Engineer</Descr>
            <Descr isSecondary>Washington, DC | tocode.ru</Descr>

            <Descr isPrimary style={{ marginTop: '2rem' }}>
              <MailIcon /> nick@gmail.com
            </Descr>
            <Descr isPrimary>
              <PhoneIcon /> +1 588-6500
            </Descr>
          </div>

          <div style={{ flex: 3, marginLeft: '1rem' }}>
            <Title size='3' isUppercase>Education:</Title>
            <Descr>Stanford University - BS Electrical Engineering</Descr>

            <Title
              size='3'
              isUppercase
              isShowButton
              onClick={() => setWorksCounter(worksCounter + 1)}
              style={{ marginTop: '3.6rem' }}
            >
              Work experience:
            </Title>
            {Array.from({ length: worksCounter }).map((_, i) => (
              <Descr key={i}>{i + 1}. Solutions Architect, Stripe.</Descr>
            ))}

            <Title
              size='3'
              isUppercase
              isShowButton
              onClick={() => setSkillsCounter(skillsCounter + 1)}
              style={{ marginTop: '3rem' }}
            >
              Skills:
            </Title>
            {Array.from({ length: skillsCounter }).map((_, i) => (
              <Range key={i} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Apps;
