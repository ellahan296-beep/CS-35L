// src/services/authService.js

/**
 * Simulates a REST API call to a Node.js backend
 * @param {string} email 
 * @param {string} password 
 */
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log("Service: Attempting to connect to API...");

    // Simulate network latency (2 seconds)
    setTimeout(() => {
      // Mock validation logic
      if (email === "user@test.com" && password === "password123") {
        
        // Mock successful JSON response from Node.js
        const mockResponse = {
          success: true,
          token: "fake-jwt-token-12345",
          user: {
            id: "101",
            email: email,
            name: "Test User"
          }
        };
        
        resolve(mockResponse);
      } else {
        // Mock error response from Node.js 
        reject({
          status: 401,
          message: "Invalid email or password. Please try again."
        });
      }
    }, 2000);
  });
};

export const signup = (username, email, password) =>
{
    return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Account created!" });
    }, 2000);
  });
};


// src/services/authService.js

// example of non-mock authservice.js

// const API_URL = "http://localhost:5000/api/auth"; // Your Node.js URL

// export const login = async (email, password) => {
//   // 1. The Request
//   const response = await fetch(`${API_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json', // Telling Node.js to expect JSON
//     },
//     body: JSON.stringify({ email, password }), // Sending the data
//   });

//   // 2. Handle non-200 status codes (401, 500, etc.)
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Login failed");
//   }

//   // 3. The Response (This will contain your JWT token)
//   return await response.json(); 
// };