import React, { useEffect, useState } from 'react';
import Login from './Login';
import './LandingPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ChatBanner from './ChatBanner';
import image1 from './images/image1.png';
import PlanDetailsModal from './PlanDetailsModal';

const CustomLandingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    AOS.init();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const jwtToken = localStorage.getItem('jwtToken');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolling(true); // Add the scrolling class to the header
    } else {
      setIsScrolling(false); // Remove the scrolling class from the header
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    // Redirect the user back to the login page
    window.location.replace('/login');
  };

  // Function to handle scrolling to a section
  const handleScrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 80; // Adjust this value according to your header's height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      const scrollDuration = 500; // Set the duration of the scroll animation in milliseconds
      const startingTime = performance.now();
      const getScrollTop = window.scrollY || document.documentElement.scrollTop;
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      const scrollStep = (timestamp) => {
        const currentTime = timestamp || performance.now();
        const elapsed = currentTime - startingTime;
        const scrollProgress = easeInOutQuad(Math.min(elapsed / scrollDuration, 1));

        window.scrollTo(0, getScrollTop + offsetPosition * scrollProgress);

        if (elapsed < scrollDuration) {
          requestAnimationFrame(scrollStep);
        }
      };

      requestAnimationFrame(scrollStep);
    }
  };

  if (!jwtToken) {
    return <Login />;
  }

  return (
    <div className="landing-page">
      {/* Chatbox Icon */}
      <div className="chatbox-icon" onClick={() => setIsChatboxOpen(!isChatboxOpen)}>
        <span className="fa-stack fa-3x rotate-animation">
          <i className="far fa-circle fa-stack-2x" style={{ color: '#007bff' }}></i>
          <i className="fas fa-comment fa-stack-1x"></i>
        </span>
      </div>

      {/* Tiny Banner */}
      <ChatBanner />

      <header className={`header${isScrolling ? ' scrolling' : ''}`}>
        {/* Logo and Navigation */}
        <img
          src="https://www.example.com/logo.png" // Replace with your logo image URL
          alt="CustomLogo"
        />
        <nav>
          {/* Navigation links */}
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="hero">
          {/* Hero Section Content */}
          <h1>Welcome to Our <span className="spanna">Website</span>!</h1>
          <p>Discover Amazing Services with Us.</p>
          <img className="img10" src={image1} alt="Description of the image" />
          <button className="btn5">Get Started</button>
        </div>

        <section id="features" className="features">
          <div className="feature">
            <i className="fa fa-check-circle"></i>
            <h3>Easy Booking</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="fa fa-star"></i>
            <h3>Trusted Cleaners</h3>
            <p>Integer nec odio. Praesent libero.</p>
          </div>
          <div className="feature">
            <i className="fa fa-heart"></i>
            <h3>Feature 3</h3>
            <p>Etiam ultricies nisi vel augue.</p>
          </div>
        </section>

        {/* Pricing Options Section */}
        <section id="pricing" className="pricing-options">
          <h2>Choose Your Plan</h2>
          <div className="options">
            <div className={`option-card bronze`} onClick={() => handlePlanClick('Bronze')}>
              <div className="option-content">
                <h3>Bronze</h3>
                <p>ksh.950</p>
                <ul>
                  <li>Gardening</li>
                  <li>Laundry</li>
                  <li>House Cleaning</li>
                </ul>
                <p>Choose one task for the cleaners to do.</p>
              </div>
            </div>
            <div className="option-card silver" onClick={() => handlePlanClick('Silver')}>
              <div className="option-content">
                <h3>Silver</h3>
                <p>ksh.1800</p>
                <ul>
                  <li>Gardening</li>
                  <li>Laundry</li>
                  <li>House Cleaning</li>
                </ul>
                <p>Choose two tasks for the cleaners to do.</p>
              </div>
            </div>
            <div className="option-card gold" onClick={() => handlePlanClick('Gold')}>
              <div className="option-content">
                <h3>Gold</h3>
                <p>ksh.2500</p>
                <ul>
                  <li>Gardening</li>
                  <li>Laundry</li>
                  <li>House Cleaning</li>
                </ul>
                <p>Choose three tasks for the cleaners to do.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conditionally render the plan details modal */}
        {selectedPlan && (
          <PlanDetailsModal selectedPlan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}

        <section id="testimonials" className="testimonials">
          <h2>What Our Customers Say</h2>
          <div className="testimonial" data-aos="fade-up">
            <img
              src="https://previews.123rf.com/images/apoev/apoev2107/apoev210700033/171405527-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg"
              alt="User 1"
            />
            <div className="quote">
              <blockquote>
                "Testimonial from User 1 goes here. Lorem ipsum dolor sit amet..."
              </blockquote>
              <p>- User 1</p>
            </div>
          </div>
          <div className="testimonial" data-aos="fade-up">
            <img
              src="https://media.istockphoto.com/id/1327592631/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-woman.jpg?s=612x612&w=is&k=20&c=hfszYWjgUTD2z9VI5i5g3LRFgYP4NRcIMlZ5FvnU86M="
              alt="User 2"
            />
            <div className="quote">
              <blockquote>
                "Testimonial from User 2 goes here. Lorem ipsum dolor sit amet..."
              </blockquote>
              <p>- User 2</p>
            </div>
          </div>
        </section>

        {/* Floating Chatbox */}
        {isChatboxOpen && (
          <div className="floating-chatbox" id="chatbox-contact">
            {/* Contact Section Content */}
            <h2>Contact Us</h2>
            <p>Have a question or need support? Contact our team.</p>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
            <button className="close-chatbox" onClick={() => setIsChatboxOpen(false)}>
              Close
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div className="social-icons">
          {/* Social media icons here */}
          <a href="#">
            <img
              src="https://www.example.com/facebook-icon.png" // Replace with your Facebook icon URL
              alt="Facebook"
            />
          </a>
          <a href="#">
            <img
              src="https://www.example.com/twitter-icon.png" // Replace with your Twitter icon URL
              alt="Twitter"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CustomLandingPage;
