import { useState, useMemo } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Tooltip } from 'antd';
import html from "../images/html.png";
import css from "../images/css.png";
import tailwind from "../images/tailwind.png";
import antd from "../images/ant-design.svg";
import shadcn from "../images/shadcn.png";
import js from "../images/js.png";
import react from "../images/reactjs.png";
import redux from "../images/redux.png";
import typescript from "../images/typescript.png";
import next from "../images/nextjs.svg";
import node from "../images/nodejs.png";
import express from "../images/express.png";
import mongodb from "../images/mongoDB.png";
import github from "../images/github.png";
import bitbucket from "../images/bitbucket.svg";
import npm from "../images/npm.png";
import postman from "../images/postman.svg";
import socket from "../images/socket-io.svg";
import docker from "../images/docker.svg";
import aws from "../images/aws.svg";
import jira from "../images/jira.svg";

const Skills = () => {
  const { darkMode } = useDarkMode();
  const [filter, setFilter] = useState('All');

  const allSkills = [
    { src: html, alt: "Html", label: "Html", category: "Frontend" },
    { src: css, alt: "Css", label: "Css", category: "Frontend" },
    { src: tailwind, alt: "Tailwind CSS", label: "Tailwind CSS", category: "UI Framework" },
    { src: antd, alt: "Ant Design", label: "Ant Design", category: "UI Framework" },
    { src: shadcn, alt: "Shadcn", label: "Shadcn", category: "UI Framework" },
    { src: js, alt: "Javascript", label: "Javascript", category: "Frontend" },
    { src: react, alt: "ReactJS", label: "React.js", category: "Frontend" },
    { src: redux, alt: "Redux", label: "Redux", category: "Frontend" },
    { src: redux, alt: "Redux Toolkit", label: "Redux Toolkit", category: "Frontend" },
    { src: typescript, alt: "Typescript", label: "Typescript", category: "Frontend" },
    { src: next, alt: "NextJS", label: "Next.js", category: "Frontend" },
    { src: node, alt: "NodeJs", label: "Node.js", category: "Backend" },
    { src: express, alt: "ExpressJs", label: "Express.js", category: "Backend", style: { width: '57px', marginTop: '26px' } },
    { src: mongodb, alt: "MongoDB", label: "MongoDB", category: "Database", style: { width: '27px' } },
    { src: github, alt: "Github", label: "Github", category: "Tools" },
    { src: bitbucket, alt: "Bitbucket", label: "Bitbucket", category: "Tools", style: { marginTop: '6px' }},
    { src: npm, alt: "NPM", label: "NPM", category: "Tools" },
    { src: postman, alt: "Postman", label: "Postman", category: "Tools" },
    { src: socket, alt: "Socket.io", label: "Socket.io", category: "Tools" },
    { src: docker, alt: "Docker", label: "Docker", category: "DevOps", style: { width: '55px', marginBottom: '10px' }},
    { src: aws, alt: "AWS", label: "AWS", category: "DevOps", style: { marginTop: '28px' }},
    { src: jira, alt: "Jira", label: "Jira", category: "Tools" }
];


  const filteredSkills = useMemo(() => {
    return filter === 'All' ? allSkills : allSkills.filter(skill => skill.category === filter);
  }, [filter]);

  const tabItems = [
    { key: 'All', label: 'All' },
    { key: 'Frontend', label: 'Frontend' },
    { key: 'UI Framework', label: 'UI Framework' },
    { key: 'Backend', label: 'Backend' },
    { key: 'Database', label: 'Database' },
    { key: 'Tools', label: 'Tools' },
    { key: 'DevOps', label: 'DevOps' }
  ];

  return (
    <section id="skills" className={`w-full min-h-[94vh] py-4 px-4 sm:px-6 md:px-10 lg:px-[4%] ${darkMode ? 'bg-[#1a1a1a]' : ''}`}>
      <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
        My <span className="text-yellow-500">Skills</span>
      </h2>
      <div className="flex flex-col h-full">
        <div className="flex flex-wrap justify-center gap-3 md:mb-10 mb-6">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`group relative capitalize font-bold text-sm px-4 py-2 transition-all duration-300 leading-none 
                ${filter === tab.key ? 'text-[#ffbf00]' : `${darkMode ? 'text-white' : 'text-black'}`} hover:text-[#ffbf00]`}
            >
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`absolute left-1/2 bottom-0 h-[1.5px] bg-[#ffbf00] transform -translate-x-1/2 transition-all duration-300 
                  ${filter === tab.key ? 'w-[70%] md:w-[80%]' : 'w-0 group-hover:w-[70%] md:group-hover:w-[80%]'}`}
              />
            </button>
          ))}
        </div>
        <div className="w-[90%] mx-auto flex flex-wrap justify-center gap-4 sm:gap-10 mt-3">
          {filteredSkills.map((tech, index) => (
            <Tooltip title={tech.label} key={index} placement="top">
              <div className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/12 text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <img
                  src={tech.src}
                  alt={tech.alt}
                  style={tech.style || {}}
                  className={`mx-auto mb-2 transition-all duration-300 ${!tech.style?.width ? "w-[60px]" : ""}`}
                />
                <h4 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                  {tech.label}
                </h4>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
