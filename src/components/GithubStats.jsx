import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const GithubStats = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      id="github-stats"
      className={`text-center py-8 px-4 sm:px-6 md:px-10 lg:px-[4%] ${
        darkMode ? 'bg-[#1a1a1a]' : 'bg-white'
      }`}
    >
      <h1
        className={`text-3xl sm:text-4xl font-semibold ${
          darkMode ? 'text-white' : 'text-black'
        }`}
      >
        Github <span className="font-bold">Stats</span>
      </h1>
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-2 mt-8">
        {[
          {
            href: 'https://git.io/streak-stats',
            src: 'https://github-readme-streak-stats.herokuapp.com?user=pratham-nemade&theme=dark&border_radius=10',
            alt: 'GitHub Streak',
          },
          {
            href: 'https://github.com/pratham-nemade',
            src: 'https://github-readme-stats.vercel.app/api?username=pratham-nemade&theme=vision-friendly-dark&show_icons=true',
            alt: 'GitHub Stats',
          },
          {
            href: 'https://github.com/pratham-nemade',
            src: 'https://github-readme-stats.vercel.app/api/top-langs/?username=pratham-nemade&layout=compact&theme=vision-friendly-dark',
            alt: 'Top Languages',
          },
        ].map((img, idx) => (
            <a
            key={idx}
            href={img.href}
            className="transition-all duration-300 transform hover:scale-105 w-full sm:w-[300px] max-w-lg lg:w-[420px] lg:h-[200px]"
          >
            <div className="w-[100%] h-48 md:w-[100%] md:h-48 lg:w-[100%] lg:h-48 overflow-hidden rounded-lg shadow-lg">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </a>
          
        ))}
      </div>
    </div>
  );
};

export default GithubStats;
