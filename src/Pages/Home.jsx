import React from 'react';
import '../Styles/Home.css';
import PrathamImage from "../Images/Pratham_Resume_Pic.jpeg"


const Home = () => {
    return (
        <section id="home">
            <div className="home-content">
                <h3>Hi there, I am</h3>
                <h1 id='user-detail-name'><span>Pratham</span> Nemade</h1>
                <p id='user-detail-intro'>Highly skilled Full Stack Web Developer specializing in the MERN stack.
                    Collaborates with cross-functional teams to create functional and scalable web
                    applications. Proficient in JavaScript and experienced in MongoDB, Express.js, React.js, and Node.js.
                    Strong problem-solving abilities and attention to detail ensure reliable and efficient code. Excellent
                    communication and collaboration skills contribute to effective teamwork. Keeping up with the latest web development
                    trends and technologies to enhance software excellence.
                </p>
                <a href='' id="resume-link-2" className='btn' >Resume</a>
            </div>
            <div className="home-img">
                <img src={PrathamImage} alt="" />
            </div>
        </section>
    );
}

export default Home;
