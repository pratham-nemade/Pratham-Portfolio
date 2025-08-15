import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

function HireMe() {
  const { darkMode } = useDarkMode();

  return (
    <div
      id="hireMe"
      className={`${
        darkMode
          ? 'bg-black'
          : 'bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500'
      } w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-[4%] py-10 shadow-lg transition-all duration-300`}
    >
      <h1
        className={`text-center md:text-left font-semibold tracking-wide ${
          darkMode ? 'text-white' : 'text-black'
        } text-[18px] sm:text-[20px] md:text-[22px]`}
      >
        I am Available for Full Stack Web Developer Roles!
      </h1>
      <a
        href="#contact"
        className={`mt-4 md:mt-0 inline-block font-semibold rounded-full px-6 py-2 text-[14px] sm:text-[15px] md:text-[16px] transition-all duration-300 transform hover:scale-105
          ${darkMode ? 'bg-white text-black hover:bg-black hover:text-white border border-white' : 'bg-black text-white hover:bg-white hover:text-black'}`}
      >
        Hire Me Now
      </a>
    </div>
  );
}

export default HireMe;
