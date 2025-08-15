import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { message } from 'antd';
import { useDarkMode } from '../context/DarkModeContext';
import Flag from 'react-world-flags';

const Contact = () => {
  const { darkMode } = useDarkMode();
  const form = useRef();

  const SERVICE_ID = 'service_29ut92w';
  const TEMPLATE_ID = 'template_o85er9k';
  const PUBLIC_KEY = 'iqXcBPHCECvcGkmJr';

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        message.success('Message sent successfully! 🎉');
        form.current.reset();
      })
      .catch((error) => {
        message.error('Failed to send message. Please try again.');
        console.error(error);
      });
  };

  const baseInputClasses = `w-full px-4 py-2 rounded-md border outline-none`;
  const lightInput = `bg-white text-black border-gray-300`;
  const darkInput = `bg-[#1e1e1e] text-white border-gray-700 placeholder-gray-400`;
  const inputClasses = `${baseInputClasses} ${darkMode ? darkInput : lightInput}`;

  const textColor = darkMode ? 'text-white' : 'text-black';
  const bgColor = darkMode ? 'bg-[#121212]' : 'bg-white';
  const cardBg = darkMode ? 'bg-[#1e1e1e]/50' : 'bg-white/30';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <section id="contact" className={`min-h-[85vh] px-4 sm:px-10 md:px-[4%] py-4 ${bgColor}`}>
      <h2 className={`text-4xl font-bold text-center mb-8 ${textColor}`}>
        Contact <span className="text-[#ffbf00]">Me</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        <div className={`md:w-1/2 w-full shadow-2xl p-6 rounded-2xl ${cardBg} backdrop-blur-md border ${borderColor}`}>
          <h3 className={`text-3xl font-bold mb-4 ${textColor}`}>
            What’s <span className="text-[#ffbf00]">up?</span>
          </h3>

          <p className={`text-base text-justify leading-relaxed ${darkMode ? 'text-gray-300' : 'text-black'}`}>
            Feel free to contact me via the form or the details below.
            Let's connect and build something awesome. 🚀
          </p>

          <div className="w-20 h-1 mt-4 mb-6 bg-[#ffbf00] rounded-full"></div>

          <ul className="space-y-6">
            <li className="flex items-center gap-4 group">
              <i className="bx bx-current-location text-black bg-[#ffbf00] px-3 py-2 rounded-full text-xl group-hover:scale-110 transition-transform duration-300"></i>
              <span className={`text-base ${textColor}`}>Nagpur, Maharashtra, India</span>
            </li>
            <li className="flex items-center gap-4 group">
              <i className="bx bx-mail-send text-black bg-[#ffbf00] px-3 py-2 rounded-full text-xl group-hover:scale-110 transition-transform duration-300"></i>
              <span className={`text-base ${textColor}`}>pnemade1916@gmail.com</span>
            </li>
            <li className="flex items-center gap-4 group">
              <i className="bx bx-devices text-black  bg-[#ffbf00] px-3 py-2 rounded-full text-xl group-hover:scale-110 transition-transform duration-300"></i>
              <span className={`text-base ${textColor} flex items-center gap-2`}>
                <Flag code="IN" style={{ width: '24px', height: '16px', borderRadius: '2px' }} />
                +91 9665920869
              </span>
            </li>
          </ul>

          <div className="mt-10 border-t border-gray-300 dark:border-gray-600 pt-4">
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              “Great things are done by a series of small things brought together.” — Vincent van Gogh
            </p>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" name="from_name" placeholder="Full Name" className={inputClasses} required />
              <input type="email" name="from_email" placeholder="Email" className={inputClasses} required />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="tel" name="phone" placeholder="Mobile Number" className={inputClasses} />
              <input type="text" name="subject" placeholder="Subject" className={inputClasses} />
            </div>
            <textarea
              name="message"
              rows="11"
              placeholder="Your Message"
              className={`${inputClasses} resize-none`}
              required
            ></textarea>

            <button
              type="submit"
              className="mt-4 w-full py-2 bg-[#ffbf00] rounded-md font-semibold text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
