import React from 'react';
import '../Styles/Skills.css';
import html from "../Images/html.png";
import css from "../Images/css.png";
import sass from "../Images/sass.png";
import bootstrap from "../Images/bootstrap.png";
import chakra from "../Images/chakraUi.svg";
import js from "../Images/js.png";
import react from "../Images/reactjs.png";
import redux from "../Images/redux.png";
import typescript from "../Images/typescript.png";
import node from "../Images/nodejs.png";
import express from "../Images/express.png";
import sql from "../Images/sql.png";
import mongodb from "../Images/mongoDB.png";
import github from "../Images/github.png";
import npm from "../Images/npm.png";
import vercel from "../Images/vercel.svg";

function Skills() {
  return (
    <section id="skills">
      <h2 className="heading">My <span>Skills</span></h2>
      <div className="skills-container">
        <div className="skills-card">
          {[
            { src: html, alt: "Html", label: "Html" },
            { src: css, alt: "Css", label: "Css" },
            { src: sass, alt: "Sass", label: "Sass" },
            { src: bootstrap, alt: "Bootstrap", label: "Bootstrap" },
            { src: chakra, alt: "Chakra UI", label: "Chakra UI" },
            { src: js, alt: "Javascript", label: "Javascript" },
            { src: react, alt: "ReactJS", label: "React.js" },
            { src: redux, alt: "Redux", label: "Redux" },
            { src: typescript, alt: "Typescript", label: "Typescript" },
            { src: node, alt: "NodeJs", label: "Node.js" },
            { src: express, alt: "ExpressJs", label: "Express.js",style: {width: '57px',marginTop:"26px"} },
            { src: sql, alt: "MySQL", label: "MySQL" },
            { src: mongodb, alt: "MongoDB", label: "MongoDB", style: {width: '27px'} },
            { src: github, alt: "Github", label: "Github" },
            { src: npm, alt: "NPM", label: "NPM" },
            { src: vercel, alt: "Vercel", label: "Vercel" },
          ].map((tech, index) => (
            <div key={index}>
              <img src={tech.src} alt={tech.alt} style={tech.style || {}} className="skills-card-img"/><h4 className="skills-card-name">{tech.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
