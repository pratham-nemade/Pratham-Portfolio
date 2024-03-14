import React from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Skills from './Pages/Skills';
import HireMe from './components/HireMe';
import Project from './Pages/Project';
import Contact from './Pages/Contact';
import Footer from './components/Footer';
import GithubStats from './components/GithubStats';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <About/>
      <Skills/>
      <GithubStats/>
      <HireMe/>
      <Project/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
