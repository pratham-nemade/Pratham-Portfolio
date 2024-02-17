import React from 'react';
import '../Styles/About.css';

const About = () => {
  return (
    <section class="about section" id="about">
      <h1 className="heading">About <span>Me</span></h1>
      <div className="container">
        <p>Hello, I am <b>Pratham Sanjay Nemade</b>; The 21-year-old Full
          Stack Web Developer. I have a solid foundation in programming concepts
          and am proficient in a variety of Tech Stack including HTML, CSS, JavaScript,
          React-js, Java 8, Node-js, and MySQL. I have working experience on both front-end
          and back-end development, and I am skilled at using frameworks such as React-js.
          In addition to my technical skills, I am a strong communicator and am able to work effectively
          with cross-functional teams.</p>
      </div>
      <div className="eduExp">
        <h1><span>Education</span> and <span>Experience</span></h1>
        <p className='description'>One of the most beautiful parts of every person's life,
          the part of their work life, I am very happy to have spent
          this part of my life with the people I loved and it has made my interest
          in my work more and more.</p>
        <div className="eduExp-container">
          <div className="education">
            <div className="top">
              <div className="detail">
                <h2>Priyadarshini College Of Engineering</h2>
                <h4>B.E - Information Technology</h4>
              </div>
              <div className="date">
                <i className='bx bxs-graduation'></i>
                <p>Aug 2019-Jun 2023</p>
              </div>
            </div>
            <div className="down">
              <p>- Typically a 4-year undergraduate program, divided into 8 semesters.</p>
            </div>
          </div>
          <div className="education">
            <div className="top">
              <div className="detail">
                <h2>Masai School</h2>
                <h4>Full Stack Web Development(MERN)</h4>
              </div>
              <div className="date">
                <i className='bx bxs-graduation'></i>
                <p>Aug 2023- Apr 2024</p>
              </div>
            </div>
            <div className="down">
              <p>- Features an intensive curriculum with over 12 hours of daily instruction, 6 days a week, for about 35 weeks.</p>
              <p>- There I covers JavaScript fundamentals, front-end (HTML, CSS, JavaScript, React.js), back-end (Node.js, Express.js), and MongoDB for database, teaching full stack integration for comprehensive web development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;