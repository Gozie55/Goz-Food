import React from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h3>GozFood</h3>
          <p>Delicious meals delivered fresh to your door. Enjoy the best of food, anytime.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section social-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer-section contact-form">
          <h4>Enquiries</h4>
          <form action="https://docs.google.com/forms/d/e/your-google-form-id/formResponse" method="POST" target="_blank" rel="noopener noreferrer">
            <input type="text" name="entry.1234567890" placeholder="Your Name" required />
            <input type="email" name="entry.0987654321" placeholder="Your Email" required />
            <textarea name="entry.1122334455" placeholder="Your Message" rows="3" required></textarea>
            <button type="submit" className="button">Send</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} GozFood. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
