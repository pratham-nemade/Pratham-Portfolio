import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import HireMe from './components/HireMe';
import Project from './pages/Project';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <HireMe />
      <Project />
      <Contact />
      <Footer />
    </DarkModeProvider>
  );
}

export default App;
