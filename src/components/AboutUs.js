import React from 'react';
import './AboutUs.css';

const authors = [
  { name: 'Teddy Wambua', role: 'Developer', social: 'https://www.linkedin.com/in/tedy-profile/' },
  { name: 'Fartun Ali', role: 'Developer', social: 'https://www.linkedin.com/in/fartun-profile/' },
  { name: 'Emmanuel Kibiwot', role: 'Developer', social: 'https://www.linkedin.com/in/emmanuel-kibiwot/' },
  { name: 'William Arasiriwa', role: 'Developer', social: 'https://www.linkedin.com/in/william-profile/' },
  { name: 'Emmanuel Wambua', role: 'Scrum Master', social: 'https://www.linkedin.com/in/emmanuel-wambua/' },
];

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-content">
        <h2>About Us</h2>
        <div className="about-image-container">
          <img src="https://t4.ftcdn.net/jpg/03/92/71/99/360_F_392719944_L0LYv3e7QozB2tsj3CfUN0HPC8eZQOWb.jpg" alt="About Us" className="about-image" />
        </div>
        <p>
          Welcome to our innovative Home Cleaning App, where cleanliness meets convenience. Our app is designed to simplify your life by providing top-notch home cleaning services at your fingertips. With a team of dedicated professionals and a seamless user experience, we are committed to transforming your living space into a sparkling haven.
        </p>
        <h3>Our Team</h3>
        <ul className="authors-list">
          {authors.map((author, index) => (
            <li key={index}>
              <h4>{author.name}</h4>
              <p>{author.role}</p>
              <a href={author.social} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="connect-with-us">
        <h3>Connect With Us</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/houseclean" target="_blank" rel="noopener noreferrer">
            <img src="https://www.example.com/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com/houseclean" target="_blank" rel="noopener noreferrer">
            <img src="https://www.example.com/twitter-icon.png" alt="Twitter" />
          </a>
        </div>
        <div className="snapchart-image-container">
          <img src="https://t4.ftcdn.net/jpg/03/92/71/99/360_F_392719944_L0LYv3e7QozB2tsj3CfUN0HPC8eZQOWb.jpg" alt="Snapchart" className="snapchart-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
