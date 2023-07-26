import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const ProtectedEndpoint = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Function to fetch data from the protected endpoint
    const fetchData = async () => {
      // Replace 'your_jwt_token_here' with the actual JWT token you have stored securely
      const jwtToken = 'your_jwt_token_here';

      try {
        const response = await fetch('https://your-api-endpoint.com/protected_endpoint', {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          setMessage('Unauthorized access');
        }
      } catch (error) {
        setMessage('Error occurred during API request');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Endpoint</h1>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedEndpoint;
