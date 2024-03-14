import React from 'react'
import '../Styles/Project.css';
import time from "../Images/time.png"

const projects = [
    {
      id: 1,
      image: time,
      title: "Time Clone",
      description: `The Time Clone project is a pixel-perfect replica of Time.com, focusing on crafting a user interface that mirrors the original site's aesthetics.`,
      features: `\Time Clone has advanced responsiveness for seamless viewing across devices.`,
      techStack: "Frontend : HTML, CSS, Bootstrap, Sass",
      links: { github: "https://github.com/pratham1916/Time-Clone", live: "https://time-clone.netlify.app/" },
    },
    {
      id: 2,
      image: time,
      title: "Time Clone",
      description: `The Time Clone project is a pixel-perfect replica of Time.com, focusing on crafting a user interface that mirrors the original site's aesthetics.`,
      features: `\Time Clone has advanced responsiveness for seamless viewing across devices.`,
      techStack: "Frontend : HTML, CSS, Bootstrap, Sass",
      links: { github: "https://github.com/pratham1916/Time-Clone", live: "https://time-clone.netlify.app/" },
    },
    {
      id: 3,
      image: time,
      title: "Time Clone",
      description: `The Time Clone project is a pixel-perfect replica of Time.com, focusing on crafting a user interface that mirrors the original site's aesthetics.`,
      features: `\Time Clone has advanced responsiveness for seamless viewing across devices.`,
      techStack: "Frontend : HTML, CSS, Bootstrap, Sass",
      links: { github: "https://github.com/pratham1916/Time-Clone", live: "https://time-clone.netlify.app/" },
    },
  ];
  function Project() {
    return (
      <section id="projects">
        <h2 className="heading">Latest <span>Projects</span></h2>
        <div className="project-container">
          {projects.map(project => (
            <div key={project.id} className="project-box">
              <img src={project.image} alt="" />
              <div className="discription">
                <h2>Project<span> #{project.id}</span></h2>
                <h1>{project.title}</h1>
                <p>
                  {project.description}<br /><br/>
                  <b>Features: </b>{project.features}<br /><br />
                  <b>{project.techStack.split('\n').map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>)}</b>
                </p>
                <div className="project-links">
                  <a href={project.links.github} target="_blank" className="links"><i className='bx bxl-github'></i></a>
                  <a href={project.links.live} target="_blank" className="links"><i class="fa-solid fa-link"></i></a>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Project;
