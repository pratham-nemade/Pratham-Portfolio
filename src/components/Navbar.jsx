import React, { useState, useEffect } from 'react';
import '../Styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const sectionElements = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px" });

        sectionElements.forEach(el => {
            observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sectionElements.forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []);

    const scrollToSection = (e) => {
        e.preventDefault();
        setIsOpen(false)
        const targetSection = e.target.getAttribute('href').substring(1);
        const section = document.getElementById(targetSection);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className={`header ${isOpen ? "open" : ""} ${isScrolled ? "sticky" : ""}`} id='nav-menu'>
            <a href="/" className="logo">Pratham<span>.</span></a>
            <nav className={`navbar ${isOpen ? "showMenu" : ""}`}>
                <a href="#home" className="nav-link home" onClick={scrollToSection}>Home</a>
                <a href="#about" className="nav-link about" onClick={scrollToSection}>About</a>
                <a href="#skills" className="nav-link skills" onClick={scrollToSection}>Skills</a>
                <a href="#projects" className="nav-link projects" onClick={scrollToSection}>Projects</a>
                <a href="#contact" className="nav-link contact" onClick={scrollToSection}>Contact</a>
                <a href="#resume" className="nav-link resume" onClick={scrollToSection}>Resume</a>
                <div className="social-media-in">
                    <a href="https://www.linkedin.com/in/pratham-nemade-56131a207/" target="_blank" rel="noopener noreferrer"><i className='bx bxl-linkedin-square'></i></a>
                    <a href="https://github.com/pratham1916" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-code"></i></a>
                </div>
            </nav>
            <div className="social-media">
                <a href="https://www.linkedin.com/in/pratham-nemade-56131a207/" target="_blank" rel="noopener noreferrer"><i className='bx bxl-linkedin-square'></i></a>
                <a href="https://github.com/pratham1916" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
                <a href="https://leetcode.com/Pratham_11/" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-code"></i></a>
            </div>
            <i className='bx bx-menu' id="menu-icon" onClick={toggleMenu}></i>
        </header>
    );
};

export default Navbar;
