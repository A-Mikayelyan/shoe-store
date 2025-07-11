// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const footerRef = useRef(null);

 useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        footerRef.current.classList.add("animate-footer");
      } else {
        footerRef.current.classList.remove("animate-footer");
      }
    },
    { threshold: 0.1 }
  );

  const ref = footerRef.current;
  if (ref) observer.observe(ref);

  return () => {
    if (ref) observer.unobserve(ref);
  };
}, []);


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("service_42o4cla", "template_3cbncp3", formData, "s0_0bYSxJjeEh5yY6")
      .then(() => {
        setIsError(false);
        setStatusMessage("✅ Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatusMessage(""), 5000);
      })
      .catch(() => {
        setIsError(true);
        setStatusMessage("❌ Failed to send message. Please try again.");
        setTimeout(() => setStatusMessage(""), 5000);
      });
  };

  return (
   <div className="contact-page">
  {/* ✅ Floating Message Banner */}
  {statusMessage && (
    <div className={`floating-banner ${isError ? "error" : "success"}`}>
      {statusMessage}
    </div>
  )}

  <div className="contact-center-block">
    <div className="contact-content">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-info">
        <p>Email: hello@pelle.com</p>
        <p> Phone: +1 (555) 123-4567</p>
        <p> Address: 123 Fashion Ave, New York, NY</p>
        <p> Hours: Mon – Fri, 9am – 6pm</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows="5"
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>

    {/* Footer Text Right Below Contact Box */}
    <div className="footer-wrapper">
      <footer className="contact-footer" ref={footerRef}>
        <p>pellé &nbsp;|&nbsp; New York — Milan — Tokyo</p>
        <p className="footer-note">
          © {new Date().getFullYear()} pellé. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
</div>

  );
};

export default Contact;
