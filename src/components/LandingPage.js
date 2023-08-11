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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faComment, faBell } from '@fortawesome/free-regular-svg-icons';
import { faComment as faSolidComment } from '@fortawesome/free-solid-svg-icons';

const CustomLandingPage = () => {
  const [userData, setUserData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [hasUnreadRequests, setHasUnreadRequests] = useState(false);
  const [notificationReminder, setNotificationReminder] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedNavLink, setSelectedNavLink] = useState(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://neatly-api.onrender.com/users/${userId}`);
        const userData = await response.json();

        setUserData(userData);

        const sortedRequests = userData.requests.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setRequests(sortedRequests);

        const latestRequest = sortedRequests.length > 0 ? sortedRequests[0] : null;
        setHasUnreadRequests(latestRequest && latestRequest.status === 'accepted');

        if (latestRequest) {
          setNotificationContent(`Latest request status: ${latestRequest.status}`);
          setShowNotification(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_frjj88b', 'template_6yxi629', form.current, 'gGCrp2rNJ48xALizp')
      .then((result) => {
        swal("Good job!", "Your email has been sent!", "success");
      }, (error) => {
        swal("Oops!", "Something went wrong, please try again!", "error");
      });
  };

  const jwtToken = localStorage.getItem('jwtToken');
  const cleanerId = localStorage.getItem('cleanerid');
  const userId = localStorage.getItem('userid');
  const userRole = localStorage.getItem('userRole');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('cleanerid');
    window.location.replace('https://house-cleaning-app-frontend.vercel.app');
  };

  const handleScrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      const scrollDuration = 500;
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
          <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{ color: '#007bff' }} />
          <FontAwesomeIcon icon={isChatboxOpen ? faComment : faSolidComment} className="fa-stack-1x" />
        </span>
  </div>
      <ChatBanner />

      {showNotification && (
        <div className="notification-popup">
          <p>The latest request is {userData?.requests?.length > 0 ? userData.requests[0].status : 'No Requests'}</p> {/* Display the request status */}
          <button className="close-notification" onClick={() => setShowNotification(false)}>
            Close
          </button>
        </div>
      )}

    {notificationReminder && (
        <div className="notification-reminder">
          {notificationReminder}
          <button className="close-reminder" onClick={() => setNotificationReminder('')}>
            Close
          </button>
        </div>
      )}

      <header className={`header${isScrolling ? ' scrolling' : ''}`}>
        <img src={require('./images/image1.png')} alt="CustomLogo" className="logo1" />
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
        
          
          {userRole === 'user' && (
            <Link to="/NotificationPage" className={selectedNavLink === 'NotificationPage' ? 'selected' : ''}>
  <FontAwesomeIcon
    icon={faBell}
    className={`notification-bell-icon ${hasUnreadRequests ? 'has-unread' : ''}`}
  />
</Link>



            )}

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        
      </header>
      <main>
        <div className="heroo">
          <div id="hero" className="hero">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="spanna3">
                  Welcome to 
                  <br/><span className="spanna">Neatly</span>!
                </h1>
               
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
                <p className="spanna4">Discover Amazing Services with Us.</p>
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
        <section id="testimonials" className="testimonials1">
  <h2>What Our Customers Say</h2>
  <div className="testimonial" data-aos="fade-up">
    <img
      src="https://previews.123rf.com/images/apoev/apoev2107/apoev210700033/171405527-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg"
      alt="User 1"
    />
    <div className="quote">
      <blockquote>
        "Neatly helped me find reliable cleaners for my home. They are efficient and professional."
      </blockquote>
      <p>- John Doe</p>
    </div>
  </div>
  <div className="testimonial" data-aos="fade-up">
    <img
      src="https://media.istockphoto.com/id/1327592631/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-woman.jpg?s=612x612&w=is&k=20&c=hfszYWjgUTD2z9VI5i5g3LRFgYP4NRcIMlZ5FvnU86M="
      alt="User 2"
    />
    <div className="quote">
      <blockquote>
        "Booking a cleaner through Neatly has been a breeze. I'm impressed by their prompt service."
      </blockquote>
      <p>- Jane Smith</p>
    </div>
  </div>
  <div className="testimonial" data-aos="fade-up">
  <img
      src="https://previews.123rf.com/images/apoev/apoev2107/apoev210700033/171405527-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg"
      alt="User 1"
    />
    <div className="quote">
      <blockquote>
        "Neatly's environmentally-friendly approach aligns with my values. Great service!"
      </blockquote>
      <p>- Michael Johnson</p>
    </div>
  </div>
  <div className="testimonial" data-aos="fade-up">
  <img
      src="https://media.istockphoto.com/id/1327592631/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-woman.jpg?s=612x612&w=is&k=20&c=hfszYWjgUTD2z9VI5i5g3LRFgYP4NRcIMlZ5FvnU86M="
      alt="User 2"
    />
    <div className="quote">
      <blockquote>
        "I love the variety of services Neatly offers. It makes life so much easier."
      </blockquote>
      <p>- Emily Davis</p>
    </div>
  </div>
  <div className="testimonial" data-aos="fade-up">
  <img
      src="https://previews.123rf.com/images/apoev/apoev2107/apoev210700033/171405527-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg"
      alt="User 1"
    />
    <div className="quote">
      <blockquote>
        "Neatly's cleaners are polite and attentive. I'm a satisfied customer."
      </blockquote>
      <p>- Alex Turner</p>
    </div>
  </div>
  <div className="testimonial" data-aos="fade-up">
  <img
      src="https://media.istockphoto.com/id/1327592631/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-woman.jpg?s=612x612&w=is&k=20&c=hfszYWjgUTD2z9VI5i5g3LRFgYP4NRcIMlZ5FvnU86M="
      alt="User 2"
    />
    <div className="quote">
      <blockquote>
        "Efficient, reliable, and friendly service. Neatly exceeded my expectations."
      </blockquote>
      <p>- Olivia Johnson</p>
    </div>
  </div>
  <div className="testimonial" data-aos="fade-up">
  <img
      src="https://media.istockphoto.com/id/1327592631/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-woman.jpg?s=612x612&w=is&k=20&c=hfszYWjgUTD2z9VI5i5g3LRFgYP4NRcIMlZ5FvnU86M="
      alt="User 2"
    />
    <div className="quote">
      <blockquote>
        "Neatly's platform is user-friendly and their cleaners are top-notch."
      </blockquote>
      <p>- David Clark</p>
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
  <div className="trusted-partners">
    <h4>Trusted Partners</h4>
    <div className="partner-images">
      {/* Add SVG icons for trusted partners */}
      <div className="partner-images">
            <img src="https://t4.ftcdn.net/jpg/03/05/89/85/360_F_305898516_XYRvICwxsFH3vRpui9fGRj1amC2XYCAv.jpg" alt="Cleaning Company 1" />
            <img src="https://dynamic.brandcrowd.com/asset/logo/6b5b1848-80fb-4736-b0d1-02e501c6b9b6/logo-search-grid-1x?logoTemplateVersion=1&v=637902511808000000" alt="Cleaning Company 2" />
            <img src="https://dynamic.brandcrowd.com/asset/logo/a1efd92f-96a6-4d56-a098-0d3f54a1a59a/logo-search-grid-1x?logoTemplateVersion=1&v=638203370689730000" alt="Cleaning Company 2" />
            <img src="https://t4.ftcdn.net/jpg/05/06/60/99/360_F_506609974_DJniih8CLPmauI0BRcbcenn4uKmiokAo.jpg" alt="Cleaning Company 2" />
          </div>
    </div>
  </div>
  <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
  <div className="social-icons">
    <a href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-facebook"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M14 0H2C.896 0 0 .896 0 2v12c0 1.104.896 2 2 2h6.585v-6.218H5.014V7.29h1.571V5.56C6.585 3.448 7.96 2 10.374 2c1.06 0 1.971.077 2.231.112v1.723h-1.52c-1.197 0-1.43.568-1.43 1.403v1.846h2.858L11.8 14.01H8.166V16h6c1.104 0 2-.896 2-2V2c0-1.104-.896-2-2-2z"
        />
      </svg>
    </a>
    <a href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-twitter"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M16 3.8a6.18 6.18 0 0 1-1.725.475 3.112 3.112 0 0 0 1.366-1.717 6.219 6.219 0 0 1-1.97.75 3.105 3.105 0 0 0-5.305 2.825A8.82 8.82 0 0 1 1.053.56a3.09 3.09 0 0 0-.42 1.558A3.096 3.096 0 0 0 2.983 6.21a3.104 3.104 0 0 1-1.404-.386v.04a3.106 3.106 0 0 0 2.49 3.042 3.097 3.097 0 0 1-1.4.053 3.107 3.107 0 0 0 2.896 2.154A6.235 6.235 0 0 1 0 13.22 8.815 8.815 0 0 0 4.774 15c5.772 0 8.924-4.775 8.924-8.925 0-.135 0-.27-.008-.405A6.356 6.356 0 0 0 16 3.8z"
        />
      </svg>
    </a>
  </div>
</footer>

    </div>
  );
};

export default CustomLandingPage;