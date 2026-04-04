import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaGraduationCap, FaBriefcase, FaLaptopCode } from 'react-icons/fa';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Dot,
} from 'recharts';
import PrathamImage from "../assets/pratham.jpg";

const timelineData = [
  {
    type: 'education',
    title: 'B.E - Information Technology',
    institution: 'Priyadarshini College of Engineering',
    duration: 'Aug 2019 - Jun 2023',
    description: [
      'Graduated with a Bachelor’s degree in Information Technology.',
      'Gained a solid foundation in computer science fundamentals, with a focus on software development, data structures, and web technologies.',
    ],
    icon: <FaGraduationCap />,
  },
  {
    type: 'education',
    title: 'Full Stack Web Development (MERN)',
    institution: 'Masai School',
    duration: 'Aug 2023 - Apr 2024',
    description: [
      'Intensive, industry-aligned program focused on the MERN stack (MongoDB, Express.js, React.js, Node.js).',
      'Gained hands-on experience in building full-stack applications, collaborating in agile teams, and following software engineering best practices.',
      'Developed several real-world projects, including a collaborative code editor with real-time collaboration and multi-language support.',
    ],
    icon: <FaGraduationCap />,
  },
  {
    type: 'experience',
    title: 'Frontend Developer',
    institution: 'Sunbase',
    duration: 'Oct 2024 - Present',
    description: [
      'Sole frontend developer on a fully configurable AI chatbot platform built with vanilla JavaScript and Gemini API, deployed as an embeddable script across 30+ client websites.',
      'Built a real-time analytics dashboard using ECharts to visualize chatbot performance metrics for 20+ clients, cutting support requests for usage data by ~50%.',
      'Architected a single reusable CRM widget component that renders 100+ widgets tracking sales, revenue, and leads — reducing per-widget build time by ~65%.',
      'Replaced manual client onboarding calls with a self-serve guided flow in React.js and Tailwind CSS, saving 3–4 hours of internal team time per client onboarded.',
      'Shipped features consistently across sprint cycles through close collaboration with backend developers and designers, maintaining code quality via regular reviews.',
    ],
    icon: <FaLaptopCode />,
  },
];



const graphData = [
  { name: '2019', education: 10, experience: 0, milestone: 'Started Engineering - Year 1: Laying the Foundation' },
  { name: '2020', education: 30, experience: 0, milestone: 'Year 2: Gaining Core Knowledge, Focusing on Fundamentals' },
  { name: '2021', education: 50, experience: 0, milestone: 'Year 3: Deepening Understanding & Beginning Projects' },
  { name: '2022', education: 80, experience: 0, milestone: 'Year 4: Preparing for Graduation, Building a Portfolio' },
  { name: '2023', education: 100, experience: 0, milestone: 'Graduated Engineering, Started Full Stack Training at Masai' },
  { name: '2024', education: 100, experience: 40, milestone: 'Full Stack Developer Training Completed, Frontend Developer Internship at Sunbase' },
  { name: '2025', education: 100, experience: 80, milestone: 'Continued Growth as a Frontend Developer, Full-time Role at Sunbase' },
];

const About = () => {
  const { darkMode } = useDarkMode();

  return (
    <section
      id="about"
      className={`px-4 sm:px-6 md:px-10 lg:px-[4%] py-4 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}
    >
      <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-14 ${darkMode ? 'text-white' : 'text-black'}`}>
        About <span className="text-yellow-500">Me</span>
      </h1>


      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-16">
        <div className="w-full lg:w-[70%] space-y-5">
          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            Hi, I'm Pratham — a Full Stack Developer with 2 years of experience building and shipping React applications in production at a US-based SaaS company. I hold a B.Tech in Information Technology from Priyadarshini College of Engineering, Nagpur, where I built a strong foundation in data structures, database systems, and software engineering principles.
          </p>

          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            At Sunbase, I work as the sole frontend developer — owning end-to-end delivery of features like an AI chatbot platform deployed across 30+ client websites, a real-time analytics dashboard serving 20+ clients, and a global CRM widget architecture that reduced per-widget build time by ~65%. I collaborate closely with backend developers and designers across sprint cycles to ship consistently and maintain code quality.
          </p>

          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            Outside of work, I built CodeXia — a real-time collaborative coding platform supporting 10+ concurrent users, a sandboxed multi-language code execution engine, and AI-powered in-editor assistance via the Groq API. It's the project I'm most proud of, as it required me to design and ship a complete product independently — from system architecture to deployment.
          </p>

          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            My core stack is React.js, TypeScript, Node.js, Express.js, MongoDB, and Tailwind CSS — but I'm comfortable across the full MERN stack and have hands-on experience with Redis, WebSockets, Docker, and AWS. I care deeply about component architecture, clean API design, and building things that are fast and maintainable.
          </p>

          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            I'm looking to grow into a senior engineering role where I can take on greater ownership, contribute to product decisions, and work alongside people who care about building things that actually matter.
          </p>
        </div>

        <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
          <img
            src={PrathamImage}
            alt="Profile"
            className="w-full max-w-sm sm:max-w-md lg:max-w-[25rem] h-auto object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-14 ${darkMode ? 'text-white' : 'text-black'}`}>
        My  <span className="text-yellow-500">Journey</span>
      </h1>

      <div className="w-full h-[300px] sm:h-[400px] mb-16">
        <ResponsiveContainer>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={darkMode ? '#ccc' : '#333'} />
            <YAxis yAxisId="left" stroke={darkMode ? '#ccc' : '#333'} domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" stroke={darkMode ? '#ccc' : '#333'} domain={[0, 100]} />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, milestone } = payload[0].payload;
                  return (
                    <div className="custom-tooltip p-2 rounded-md bg-black text-white max-w-xs text-sm">
                      <strong>{name}</strong>
                      <p>{milestone}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="education"
              stroke="#facc15"
              activeDot={<Dot r={6} fill="#facc15" />}
              dot={{ fill: '#facc15', r: 4 }}
              strokeWidth={2}
              yAxisId="left"
            />
            <Line
              type="monotone"
              dataKey="experience"
              stroke="#4e8d7c"
              activeDot={<Dot r={6} fill="#4e8d7c" />}
              dot={{ fill: '#4e8d7c', r: 4 }}
              strokeWidth={2}
              yAxisId="right"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <VerticalTimeline>
        {timelineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: darkMode ? '#333' : '#fef9c3',
              color: darkMode ? '#fff' : '#000',
              padding: '0.8rem',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
            contentArrowStyle={{ borderRight: '7px solid #facc15' }}
            date={item.duration}
            iconStyle={{
              background: '#facc15',
              color: darkMode ? '#000' : '#fff',
            }}
            icon={item.icon}
          >
            <h3 className="font-bold text-lg">{item.institution}</h3>
            <h4 className="text-sm font-semibold mb-2">{item.title}</h4>

            <ul className="list-disc pl-5 text-sm overflow-y-auto pr-1"

              style={{
                maxHeight: '130px',
                scrollbarWidth: 'none',
              }}
            >
              <style jsx>{`
                ul::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {item.description.map((point, idx) => (
                <li key={idx} className="mb-1">
                  {point}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>


    </section>
  );
};

export default About;
