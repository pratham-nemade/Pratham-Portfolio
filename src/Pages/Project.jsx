import React, { useState } from 'react';
import { Modal } from 'antd';
import time from '../images/time.png';
import CodeXia from '../images/CodeXia.png';
import { useDarkMode } from '../context/DarkModeContext';

const projects = [
  {
    id: 1,
    image: CodeXia,
    title: "CodeXia - Real-Time Collaborative Coding Platform",
    description:
      "CodeXia is a production-ready real-time collaborative coding platform built with the MERN stack. It enables multiple users to write, execute, and manage code simultaneously while offering AI assistance, secure authentication, and a live frontend playground similar to CodePen. The platform is designed with scalability, performance optimization, and real-time architecture in mind.",

    features: [
      "Real-time multi-user collaborative editing using Socket.IO.",
      "Instant in-app notifications for collaboration events and file activities.",
      "Multi-language backend code execution with dynamic processing.",
      "CodePen-style HTML, CSS, and JavaScript live playground with instant preview.",
      "Support for external CSS and JavaScript CDN integration.",
      "Collaborative frontend editing with synchronized rendering output.",
      "AI-powered coding assistance integrated via Groq API.",
      "JWT-based authentication with OTP email verification.",
      "Structured project and file management system.",
      "Redis caching for improved performance and scalability."
    ],

    techStack:
      "React.js, Redux Toolkit, Tailwind CSS, ShadCN UI, Node.js, Express.js, MongoDB, Redis, Socket.IO, JWT, REST APIs, Groq API",

    links: {
      github: "https://github.com/pratham-nemade/Codexia",
      live: "https://codexia-final.vercel.app/"
    }
  },
  {
    id: 1,
    image: time,
    title: 'Time Clone',
    description:
      "The Time Clone project is a pixel-perfect replica of Time.com, focusing on crafting a user interface that mirrors the original site's aesthetics. It demonstrates advanced responsiveness, pixel-perfect layout, and a clean file structure.",
    features: [
      'Advanced responsiveness across devices.Advanced responsiveness across devices.Advanced responsiveness across devices.Advanced responsiveness across devices.Advanced responsiveness across devices.',
      'Pixel-perfect UI alignment.',
      'Mobile, tablet & desktop optimized.',
      'Clean and organized file structure.',
      'Sass modularization for easier styling.',
    ],
    techStack: 'HTML, CSS, Bootstrap, Sass',
    links: {
      github: 'https://github.com/pratham1916/Time-Clone',
      live: 'https://time-clone.netlify.app/',
    },
  },

];

function Project() {
  const { darkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const showModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className={`min-h-[94vh] px-4 sm:px-6 md:px-10 lg:px-[4%] py-4 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}
    >
      <h2
        className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-black'}`}
      >
        Latest <span className="text-[#ffbf00]">Projects</span>
      </h2>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
          <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <i className={`fas fa-hourglass-half text-4xl relative z-10 animate-spin-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}></i>
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Nothing to See Here... Yet!
          </h2>
          <p className={`max-w-2xl text-base mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            I'm currently working on some exciting projects. Check back soon to explore them!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.015] ${darkMode ? 'bg-[#333333]' : 'bg-[#fffbea]'}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 sm:h-72 object-cover rounded-t-2xl"
              />
              <div className="px-4 py-3 flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Project #{project.id}
                  </span>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 flex items-center justify-center rounded-full text-black bg-[#ffbf00] hover:bg-black hover:text-white transition-colors"
                    >
                      <i className="bx bxl-github"></i>
                    </a>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 flex items-center justify-center rounded-full text-black bg-[#ffbf00] hover:bg-black hover:text-white transition-colors"
                    >
                      <i className="fa-solid fa-external-link-alt text-[12px]"></i>
                    </a>
                    <button
                      onClick={() => showModal(project)}
                      className="text-xs px-2 py-1 rounded-full bg-[#ffbf00] font-semibold text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                    >
                      More Info
                    </button>
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {project.description}
                </p>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <span className="font-semibold text-[#ffbf00]">Features:</span>
                  <ul className="list-disc mx-4 mt-1 space-y-1">
                    {project.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="text-sm">
                        <div className="line-clamp-1 overflow-hidden text-ellipsis">
                          {feature}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.split(',').map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 font-semibold rounded-full border border-[#ffbf00] dark:text-[#ffbf00]"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        closable={false}
        className={`${darkMode ? 'dark custom-modal-dark' : ''}`}
        bodyStyle={{
          overflow: 'hidden',
          padding: 0,
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        {selectedProject && (
          <div className="flex flex-col max-h-[90vh]">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-60 object-cover rounded-t-md"
            />
            <div className={`py-2 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <h3 className="text-2xl font-bold text-[#ffbf00]">{selectedProject.title}</h3>
              <div className="flex gap-2">
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-full text-black bg-[#ffbf00] hover:bg-black hover:text-white transition-colors"
                >
                  <i className="bx bxl-github"></i>
                </a>
                <a
                  href={selectedProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-full text-black bg-[#ffbf00] hover:bg-black hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-2 space-y-2 no-scrollbar">
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{selectedProject.description}</p>
              <div>
                <span className="font-semibold text-[#ffbf00]">Features:</span>
                <ul className="list-disc list-outside pl-5 mt-1 space-y-1">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.techStack.split(',').map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 font-semibold rounded-full border border-[#ffbf00] ${darkMode ? 'text-[#ffbf00]' : 'text-black'}`}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default Project;
