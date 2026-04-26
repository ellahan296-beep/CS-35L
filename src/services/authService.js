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
        // Mock error response from Node.js (e.g., 401 Unauthorized)
        reject({
          status: 401,
          message: "Invalid email or password. Please try again."
        });
      }
    }, 2000);
  });
};