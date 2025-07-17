import React from "react";
import "./About.css"; // You can style it similarly to the Hermes layout
import { useRef, useEffect } from "react";

const AboutPage = () => {

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
  return (
    <div className="about-page">
      <section className="intro">
        <h2>ABOUT OUR BRAND </h2>
        <h1>CONTEMPORARY ARTISANS SINCE 1990</h1>
        <p>
          Founded with a vision to redefine modern craftsmanship, our company
          blends creativity with precision to produce timeless pieces. Rooted in
          tradition, yet driven by innovation, we remain faithful to human
          values and sustainable practices. Our dedication to quality is
          reflected in every item we create—products that are not only
          functional but also carry stories, emotions, and a sense of belonging.
        </p>
        <p>
          With workshops in multiple countries and a growing international
          presence, we continue to shape a legacy of authenticity, excellence,
          and responsibility. Through continuous investment in local talent and
          ethical sourcing, we aim to preserve artisanal skills while setting
          global standards in design and integrity.
        </p>
      </section>

      <section className="section split">
        <div className="text">
          <h2>ENTREPRENEURIAL DRIVE</h2>
          <p>
            From the very beginning, we’ve been a proudly independent
            team—driven, resilient, and deeply committed to nurturing talent and
            fostering a spirit of innovation. Our entrepreneurial journey has
            been built on curiosity, perseverance, and a willingness to take
            bold steps into the unknown. We believe in creating value not just
            through products, but by empowering individuals, supporting local
            economies, and building meaningful relationships across the globe.
            Our mission remains clear: to inspire, to connect, and to transform
            ideas into lasting impact.
          </p>
        </div>
        <img
          src="/images/about-page-img2.png"
          alt="Team gathered outside office"
        />
      </section>

      <section className="section split">
        <img
          src="/images/about-page-img1.png"
          alt="Artisans working at a bench"
        />
        <div className="text">
          <h2>CREATIVE EXPRESSION</h2>
          <p>
            Every product we design is a result of exploration, imagination, and
            thoughtful craftsmanship. Our creative process is driven by
            curiosity and a desire to build objects that hold meaning. Each
            collection is made to adapt, inspire, and evolve—crafted with care
            to reflect changing lifestyles, cultural diversity, and the unique
            stories of those who use them. We believe that creativity should not
            only be expressive, but also inclusive and enduring.
          </p>
        </div>
      </section>

      <section className="section center">
        
        <div className="text center-text">
          <h2>ARTISANAL INTEGRITY</h2>
          <p>
            We believe in preserving heritage techniques and valuing the hands
            that bring them to life. Our artisans are the heart of our
            work—skilled, dedicated, and deeply respected for their precision,
            patience, and passion. Every product we create is the result of
            countless hours of care, passed down through generations of
            craftsmanship. By honoring these traditions while embracing
            thoughtful innovation, we ensure that each piece carries meaning,
            authenticity, and a human touch. This is not just a method of
            making—it is a philosophy rooted in excellence and dignity.
          </p>

          <img
          src="/images/last-image.png"
          alt="Craftsman working"
          className="center-image"
        />
        </div>
      </section>

       <div className="footer-wrapper">
        <footer className="contact-footter" ref={footerRef}>
          <p>pellé &nbsp;|&nbsp; New York — Milan — Tokyo</p>
          <p className="footer-note">
            © {new Date().getFullYear()} pellé. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
