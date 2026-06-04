

const API_URL = "http://localhost:9999/api";

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Login failed");
    error.status = response.status;
    throw error;
  }

  return data;
};

export const signup = async (username, email, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Signup failed");
    error.status = response.status;
    throw error;
  }

  return data;
};