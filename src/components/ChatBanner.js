

import React, { useEffect, useState } from 'react';

const ChatBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBanner((prevShowBanner) => !prevShowBanner);
    }, 5000); // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="chat-banner">
      Chat with us
    </div>
  );
};

export default ChatBanner;
