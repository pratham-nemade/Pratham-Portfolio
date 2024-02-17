import React from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  return (
    <section id="contact">
      <h2 className="heading">Contact <span>Me!</span></h2>
      <div className="contact-container">
        <div className="contact-info">
          <h1>Whats <span>up?</span></h1>
          <p>You can get my contact information here and if you like, you can see the urls of my pages on social networks from the top of the page and find me there.</p>
          
          <ul>
            <li className="media">
              <i className='bx bx-current-location'></i>
              <span>Nagpur, Maharashtra, India</span>
            </li>
            <li className="media" id="contact-email">
              <i className='bx bx-mail-send'></i>
              <span>pnemade1916@gmail.com</span>
            </li>
            <li className="media" id="contact-phone">
              <i className='bx bx-devices'></i>
              <span>9665920869</span>
              <div className="social-media media1">
                <a href="https://www.linkedin.com/in/pratham-nemade-56131a207/" target="_blank" rel="noopener noreferrer" id="contact-linkedin"><i className='bx bxl-linkedin-square'></i></a>
                <a href="https://github.com/pratham1916" target="_blank" rel="noopener noreferrer" id='contact-github'><i className='bx bxl-github'></i></a>
            </div>
            </li>
          </ul>

          
          
        </div>
        <form className="contact_form" action="#">
          <div className="input-box">
            <input type="text" className="fullname" placeholder="Full Name" required />
            <input type="email" className="email" placeholder="Email Address" required />
          </div>
          <div className="input-box">
            <input type="tel" className="mobileNo" placeholder="Mobile Number" required />
            <input type="text" className="subject" placeholder="Email Subject" required />
          </div>
          <textarea rows="8" cols="30" className="message" placeholder="Your Message" required></textarea>
          <input type="submit" value="Send Message" className="btn" />
        </form>
      </div>
    </section>
  );
};

export default Contact;
