import React from 'react';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Skills from './Pages/Skills';
import HireMe from './components/HireMe';
import Footer from './components/Footer';
import { DarkModeProvider } from './context/DarkModeContext';
import Project from './Pages/Project';
import Contact from './Pages/Contact';

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
