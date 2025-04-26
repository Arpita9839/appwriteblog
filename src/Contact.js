import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { InlineWidget } from 'react-calendly';
import logo from "./images/logo (7).jpeg";
import logoVideo from "./images/video.png";
import logoSecure from "./images/secure.jpeg";
import logoTime from "./images/time.png";
import myImage from "./images/images (1).jpeg";

const Contact = () => {
  const form = useRef();
  const [showCalendly, setShowCalendly] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_im1t3fk', 'template_pmxd4oc', form.current, {
        publicKey: 'NHDc3yy_staCudyHI',
      })
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert('Email sent successfully!');
          setShowCalendly(true);

          const name = form.current.from_name.value;
          const email = form.current.from_email.value;
          setUserData({ name, email });
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send email. Please try again.');
        }
      );
  };

  const calendlyUrl = `https://calendly.com/arpitasingh412001?name=${userData.name}&email=${userData.email}`;

  return (
    <div className="container">
     
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
     

      <div className="main-section">
        
        
        <div className="left-column">
          <h1>Expert IT Consultation at Your Fingertips</h1>
          <p>Schedule a free discovery call and transform your tech strategy.</p>
  
          <div className="info-block">
            <img src={logoVideo} alt="logo" />
            <p>Virtual Consultation Available 24/7</p>
          </div>
          <div className="info-block">
            <img src={logoSecure} alt="logo" />
            <p>Secure and Confidential Meeting</p>
          </div>
          <div className="info-block">
            <img src={logoTime} alt="logo" />
            <p>30-minute Free Strategy Session</p>
          </div>
  
          <img src={myImage} alt="Illustration" className="side-image" />
        </div>
        
  
       
        <div className="right-column">
          {!showCalendly ? (
            <form ref={form} onSubmit={sendEmail} className="contact-form" id="contact">
              <h2>Contact Us</h2>
              <label>Name</label>
              <input type="text" name="from_name" required />
              <label>Email</label>
              <input type="email" name="from_email" required />
              <label>Message</label>
              <textarea name="message" required />
              <input type="submit" value="Submit" />
            </form>
          ) : (
            <div className="calendly-wrapper">
              <h2>Schedule a Meeting</h2>
              <InlineWidget url= 'https://calendly.com/arpitasingh412001' />
            </div>
          )}
        </div>
      </div>
      <div className="trusted-companies">
  <p>Trusted By Leading Companies</p>
  <div className="company-buttons">
    <button>Company 1</button>
    <button>Company 2</button>
    <button>Company 3</button>
  </div>
</div>

    </div>
    
  );
};

export default Contact;
