import { Typewriter } from 'react-simple-typewriter';
import { useDarkMode } from '../context/DarkModeContext';

import html from "../assets/html.png";
import css from "../assets/css.png";
import tailwind from "../assets/tailwind.png";
import antd from "../assets/ant-design.svg";
import shadcn from "../assets/shadcn.png";
import js from "../assets/js.png";
import react from "../assets/reactjs.png";
import redux from "../assets/redux.png";
import typescript from "../assets/typescript.png";
import next from "../assets/nextjs.svg";
import node from "../assets/nodejs.png";
import express from "../assets/express.png";
import mongodb from "../assets/mongoDB.png";
import github from "../assets/github.png";
import bitbucket from "../assets/bitbucket.svg";
import npm from "../assets/npm.png";
import postman from "../assets/postman.svg";
import socket from "../assets/socket-io.svg";
import docker from "../assets/docker.svg";
import aws from "../assets/aws.svg";
import jira from "../assets/jira.svg";

const orbit1 = [html, css, tailwind, antd, shadcn, js, react];
const orbit2 = [redux, typescript, next, node, express, socket, mongodb];
const orbit3 = [github, bitbucket, npm, postman, docker, aws, jira];


const Home = () => {
  const { darkMode } = useDarkMode();

  return (
    <section id="home" className={`relative flex flex-col md:flex-row items-center justify-between min-h-screen px-4 md:px-[4%] overflow-hidden ${
        darkMode ? 'bg-[#1a1a1a]' : 'bg-[#FFF7DF]'
      }`}>
      <div className="absolute top-[-200px] left-[-250px] w-[800px] h-[800px] md:top-[-250px] md:left-[-250px] md:w-[1000px] md:h-[1000px] rounded-full bg-white dark:bg-black z-0"></div>

      <div className="relative z-10 w-full md:w-1/2 text-center md:text-left mt-24 md:mt-0">
        <h1
          id="user-detail-name"
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-[#ffbf00]"
        >
          <span className="text-[#ffbf00]">Pratham</span> Nemade
        </h1>
        <h2
          className={`text-lg sm:text-xl md:text-2xl font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}
        >
          <Typewriter
            words={[
              'Full Stack Web Developer',
              'MERN Stack Enthusiast',
              'Lifelong Learner & Tech Explorer',
              'Performance-Focused Engineer',
              'User-Centric Developer',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
        <p
          id="user-detail-intro"
          className={`text-base sm:text-lg md:text-xl mb-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          I'm a Full Stack Developer skilled in React.js, Next.js, Node.js, Express.js, and Tailwind CSS. I specialize in building scalable, user-centric web apps with a focus on performance, clean architecture, and smooth user experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <a
            href="/Pratham-Nemade-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#ffbf00] hover:bg-black dark:hover:bg-white dark:hover:text-black transition duration-300 font-semibold py-2 px-6 rounded-full shadow"
          >
            View Resume
          </a>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/pratham-nemade-56131a207/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-[#ffbf00] hover:bg-black dark:hover:bg-white dark:hover:text-black transition duration-300"
            >
              <i className="bx bxl-linkedin-square text-xl"></i>
            </a>
            <a
              href="https://github.com/pratham-nemade"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-[#ffbf00] hover:bg-black dark:hover:bg-white dark:hover:text-black transition duration-300"
            >
              <i className="bx bxl-github text-xl"></i>
            </a>
            <a
              href="https://leetcode.com/Pratham_11/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-[#ffbf00] hover:bg-black dark:hover:bg-white dark:hover:text-black transition duration-300"
            >
              <i className="fa-solid fa-code text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] mt-10 mb-10 md:mt-0 md:mb-0">
        <div
          className={`absolute w-full h-full rounded-full border ${
            darkMode ? 'border-white' : 'border-black'
          } animate-spin-slow`}
        >
          {orbit1.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt=""
              className="absolute w-8 sm:w-10 md:w-12"
              style={{
                top: `${50 - 50 * Math.cos((i * 2 * Math.PI) / orbit1.length)}%`,
                left: `${50 + 50 * Math.sin((i * 2 * Math.PI) / orbit1.length)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div
          className={`absolute top-[12.5%] left-[12.5%] w-[75%] h-[75%] rounded-full border ${
            darkMode ? 'border-white' : 'border-black'
          } animate-spin-medium origin-center`}
        >
          {orbit2.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt=""
              className="absolute w-8 sm:w-10 md:w-12"
              style={{
                top: `${50 - 50 * Math.cos((i * 2 * Math.PI) / orbit2.length)}%`,
                left: `${50 + 50 * Math.sin((i * 2 * Math.PI) / orbit2.length)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div
          className={`absolute top-[25%] left-[25%] w-[50%] h-[50%] rounded-full border ${
            darkMode ? 'border-white' : 'border-black'
          } animate-spin-fast origin-center`}
        >
          {orbit3.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt=""
              className="absolute w-8 sm:w-10 md:w-12"
              style={{
                top: `${50 - 50 * Math.cos((i * 2 * Math.PI) / orbit3.length)}%`,
                left: `${50 + 50 * Math.sin((i * 2 * Math.PI) / orbit3.length)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
