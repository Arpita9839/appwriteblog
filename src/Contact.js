import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { InlineWidget } from 'react-calendly';

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
    <div className="contact-container">

      {!showCalendly ? (
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <h2>Contact Us</h2>
          <label>Name</label>
          <input type="text" name="from_name" required />
          <label>Email</label>
          <input type="email" name="from_email" required />
          <label>Message</label>
          <textarea name="message" required />
          <input type="submit" value="Send" />
        </form>
      ) : (
        <div className="calendly-wrapper">
          <h2>Schedule a Meeting</h2>
        
          <InlineWidget url={calendlyUrl} />
        </div>
      )}
    </div>
  );
};

export default Contact;

