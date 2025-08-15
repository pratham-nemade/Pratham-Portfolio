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
import PrathamImage from "../images/pratham.jpg";

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
      'As a key member of the frontend development team at Sunbase, I have been responsible for designing and building scalable and user-friendly web applications. I have focused on ensuring seamless user experiences across various platforms and devices',
      'Designed and implemented responsive UI/UX features, enhancing the overall user experience across devices.',
      'Collaborated with cross-functional teams (backend, design, and product) to deliver new features and resolve issues in a timely manner.',
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
            Hi, I’m Pratham — a passionate Frontend Developer with strong proficiency across the MERN stack, and a B.Tech graduate in Information Technology. My time at college was not just about earning a degree, but about building a solid foundation in core computer science concepts such as data structures & algorithms, database management systems, operating systems, networking, and software engineering principles. I also gained hands-on experience with modern web technologies, which sparked my interest in crafting user-friendly, high-performance applications.
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            With over a year of professional experience, I have built fast, scalable, and user-focused applications using React.js, TypeScript, Tailwind CSS, Next.js, Node.js, Express.js, and MongoDB. My approach emphasizes clean, maintainable code, intuitive UX, and performance optimization.
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            One of my most rewarding projects was designing and developing a full-stack collaborative code editor from scratch, handling both frontend and backend independently. This strengthened my technical skills, system design thinking, and ability to deliver complete product features under tight timelines.
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            While my expertise lies in frontend engineering, I actively expand my backend and infrastructure skills — from building scalable APIs to implementing DevOps workflows, automating CI/CD pipelines, and managing cloud deployments for efficient delivery.
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-black'} text-base sm:text-[16px] leading-relaxed`}>
            I’m driven by ownership, innovation, and impact. My long-term goal is to grow into a Senior Developer role, leading high-performance teams in product-first tech companies. I enjoy working with equally passionate, growth-oriented professionals who are committed to solving real-world problems with technology — and I strive to make every project I work on not just functional, but exceptional.
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
