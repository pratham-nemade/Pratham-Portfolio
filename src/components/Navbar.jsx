import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const scrollToSection = useCallback((e) => {
    e.preventDefault();
    closeMenu();
    const id = e.currentTarget.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -50;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `${id}`);
    }

  }, [closeMenu]);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            window.history.pushState(null, '', `${sectionId}`);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const links = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <header className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 
        ${isScrolled || isMobile
        ? 'bg-white dark:bg-black shadow-md'
        : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-6 py-2 md:px-14">
        <a href="/" className="text-2xl font-bold text-black dark:text-white">
          Pratham<span className="text-[#ffbf00]">.</span>
        </a>
        <nav
          ref={menuRef}
          role="navigation"
          aria-label="Main Navigation"
          className={`${isOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row md:items-center gap-3 text-center bg-white dark:bg-black md:dark:bg-transparent md:bg-transparent w-full md:w-auto p-4 md:py-1 absolute md:static top-[50px] left-0 md:top-auto transition-all duration-300`}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={scrollToSection}
              className={`group relative capitalize font-bold text-sm px-3 py-1.5 transition-all duration-300 leading-none 
              ${activeSection === link ? 'text-[#ffbf00]' : 'md:text-black text-black dark:md:text-white dark:text-white'} hover:text-[#ffbf00] dark:hover:text-[#ffbf00]`}
            >
              <span className="relative z-10">{link}</span>
              <span
                className={`absolute left-1/2 bottom-0 h-[2px] bg-[#ffbf00] transform -translate-x-1/2 transition-all duration-300 
                ${activeSection === link ? 'w-[10%] md:w-[80%]' : 'w-0 group-hover:w-[10%] md:group-hover:w-[80%]'}`}
              />
            </a>
          ))}
          <div className="flex justify-center items-center gap-3 mt-4 md:hidden">
            <CTAButton scrollToSection={scrollToSection} />
          </div>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <CTAButton scrollToSection={scrollToSection} />
          <DarkModeToggle />
        </div>
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="text-3xl text-[#ffbf00]"
          >
            <i className="bx bx-menu" />
          </button>
        </div>
      </div>
    </header>
  );
};

const CTAButton = ({ scrollToSection }) => (
  <a href="#contact" onClick={scrollToSection} className="px-3 md:px-4 py-1 md:py-2 text-[14px] font-semibold rounded-full bg-[#ffbf00] text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300">
    Let’s Connect
  </a>
);

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="w-12 h-7 rounded-full relative bg-gray-300 dark:bg-black dark:border dark:border-white transition-all duration-300 focus:outline-none"
    >
      <span
        className={`absolute top-1/2 left-1 w-5 h-5 rounded-full flex items-center justify-center transform transition-all duration-300 -translate-y-1/2
        ${darkMode ? 'translate-x-5 bg-[#ffbf00] text-black' : 'translate-x-0 bg-white text-[#ffbf00]'}`}
      >
        {darkMode ? <i className="bx bx-moon text-sm" /> : <i className="bx bx-sun text-sm" />}
      </span>
    </button>
  );
};

export default Navbar;
