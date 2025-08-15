import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const { darkMode } = useDarkMode();
  const [showScroll, setShowScroll] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        id="footer"
        className="flex flex-col md:flex-row justify-center items-center p-5 gap-2 md:gap-0 w-full bg-black text-white text-center"
      >
        <p className="text-sm">
          Made with ❤️ and lots of ☕ © {currentYear}{' '}
          <a
            href="#home"
            className="ml-1 text-[#ffbf00] font-semibold hover:underline inline-block"
          >
            Pratham Nemade
          </a>
        </p>

        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 p-2 bg-[#ffbf00] text-black rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
      </footer>
    </>
  );
};

export default Footer;
