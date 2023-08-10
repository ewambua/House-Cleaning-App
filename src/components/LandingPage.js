import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
import Login from './Login';
import './LandingPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ChatBanner from './ChatBanner';
import image1 from './images/image1.png';
import PlanDetailsModal from './PlanDetailsModal';
import AboutUs from './AboutUs';
import UserProfile from './UserProfile';


const CustomLandingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedNavLink, setSelectedNavLink] = useState(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  useEffect(() => {
    AOS.init();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_frjj88b', 'template_6yxi629', form.current, 'gGCrp2rNJ48xALizp')
      .then((result) => {
        console.log(result.text);
        swal("Good job!", "Your email has been sent!", "success");
      }, (error) => {
        console.log(error.text);
        swal("Oops!", "Something went wrong, please try again!", "error");
      });
  };
  const jwtToken = localStorage.getItem('jwtToken');
  const cleanerId = localStorage.getItem('cleanerid');
  const userId = localStorage.getItem('userid');
  const userRole = localStorage.getItem('userRole');
  
  console.log(cleanerId, userId)

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('cleanerid'); // Remove cleaner ID on logout
    window.location.replace('http://localhost:4000');
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

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  if (!jwtToken) {
    return <Login />;
  }

  const showCleanerSections = cleanerId === undefined;

  return (
    <div className="landing-page">
      <div className="chatbox-icon" onClick={() => setIsChatboxOpen(!isChatboxOpen)}>
        <span className="fa-stack fa-3x rotate-animation">
          <i className="far fa-circle fa-stack-2x" style={{ color: '#007bff' }}></i>
          <i className="fas fa-comment fa-stack-1x"></i>
        </span>
      </div>
      <ChatBanner />
      <header className={`header${isScrolling ? ' scrolling' : ''}`}>
        <img src={require('./images/image1.png')} alt="CustomLogo" className="logo" />
        <nav>
        {userRole === 'cleaner' && (
          <>
            <Link to="/Dashboard" className={selectedNavLink === 'Dashboard' ? 'selected' : ''}>
              Dashboard
            </Link>
            <a
            href="#features"
            className={selectedNavLink === 'features' ? 'selected' : ''}
            onClick={() => {
              setSelectedNavLink('features');
              handleScrollToSection('features');
            }}
          >
            Features
          </a>
          </>
          )}
          {userRole === 'user' && (
            <>
              <a
                href="#hero"
                className={selectedNavLink === 'contact' ? 'selected' : ''}
                onClick={() => {
                  setSelectedNavLink('contact');
                  handleScrollToSection('contact');
                }}
              >
                Home
              </a>
              <a
                href="#features"
                className={selectedNavLink === 'features' ? 'selected' : ''}
                onClick={() => {
                  setSelectedNavLink('features');
                  handleScrollToSection('features');
                }}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={selectedNavLink === 'pricing' ? 'selected' : ''}
                onClick={() => {
                  setSelectedNavLink('pricing');
                  handleScrollToSection('pricing');
                }}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className={selectedNavLink === 'testimonials' ? 'selected' : ''}
                onClick={() => {
                  setSelectedNavLink('testimonials');
                  handleScrollToSection('testimonials');
                }}
              >
                Testimonials
              </a>
              <Link
                to="/NotificationPage"
                className={selectedNavLink === 'NotificationPage' ? 'selected' : ''}
              >
                NotificationPage
              </Link>
              <Link to="/AboutUs" className={selectedNavLink === 'AboutUs' ? 'selected' : ''}>
                AboutUs
              </Link>
            </>
          )}
          <Link
            to="#"
            onClick={() => setIsProfilePopupOpen(true)}
            className={selectedNavLink === 'profile' ? 'selected' : ''}
          >
            Profile
          </Link>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="heroo">
          <div id="hero" className="hero">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="main-head">
                  Welcome to <span className="spanna">Neatly</span>!
                </h1>
                <p>Discover Amazing Services with Us.</p>
                <a
                  href="#pricing"
                  className="btn5 btn-get-started"
                  onClick={() => {
                    setSelectedNavLink('pricing');
                    handleScrollToSection('pricing');
                  }}
                >
                  Get Started
                </a>
              </div>
              <div className="hero-image-container">
                <div className="image-overlay"></div>
                <img
                  className="hero-image"
                  src="https://i1.wp.com/catesthill.com/wp-content/uploads/2019/01/Frode-sofa-bed-565-twist-granite-1.jpg?resize=1500%2C680&ssl=1"
                  alt="Hero Background"
                />
              </div>
            </div>
          </div>
        </div>
        <section id="features" className="features">
          <div className="feature">
            <i className="fa fa-check-circle"></i>
            <h3>Easy Booking</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="fa fa-check-circle"></i>
            <h3>Trusted Partners</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="fa fa-star"></i>
            <h3>Trusted Cleaners</h3>
            <p>Integer nec odio. Praesent libero.</p>
          </div>
          <div className="feature">
            <i className="fa fa-heart"></i>
            <h3>Environment friendly</h3>
            <p>The products that our cleaners use are organic and do not affect the environment.</p>
          </div>
        </section>
        {userRole === 'user' && (
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
        )}
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
        {isProfilePopupOpen && (
          <div className="popup-overlay">
            <div className="profile-popup">
              <div className="popup-content">
                <UserProfile />
                <button className="close-popup" onClick={() => setIsProfilePopupOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {isChatboxOpen && (
          <div className="floating-chatbox" id="chatbox-contact">
            <h2>Contact Us</h2>
            <p>Have a question or need support? Contact our team.</p>
            <form ref={form} onSubmit={sendEmail}>
              <label>Name</label>
              <input type="text" name="user_name" />
              <label>Email</label>
              <input type="email" name="user_email" />
              <label>Message</label>
              <textarea name="message" />
              <input type="submit" value="Send" />
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
          <a href="#">
            <img src="https://www.example.com/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="https://www.example.com/twitter-icon.png" alt="Twitter" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CustomLandingPage;