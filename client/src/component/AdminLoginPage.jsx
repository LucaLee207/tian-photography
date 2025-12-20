import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function AdminLoginPage({setUserRole}) {
  const LOGIN_URL = 'http://localhost:5000/api/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // Example login handler (replace with your actual backend call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      // 1. Send Credentials to the Backend
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });

      // 2. Handle Successful Login (HTTP 200 OK)
      if (response.data.authenticated) {
        const token = response.data.token;
        
        // 3. Store the Token Securely
        // Storing in localStorage is simple, but session storage or an HTTP-only cookie 
        // set by the backend is often preferred for security.
        localStorage.setItem('adminToken', token); 
        // alert('Login Successful! Token stored.');
        setUserRole("admin");
        navigate("/");
        // 4. Redirect the Admin to the main admin/edit page
        // Example: navigate('/admin/dashboard'); 
        // Use history.push or useNavigate() from react-router-dom
        
      } else {
         // This branch should theoretically not be hit if the backend returns 401 on failure
         setError('Login failed. Please check your network.');
      }

    } catch (err) {
      // 5. Handle Login Failure (Backend returns 401 Unauthorized)
      console.error("Login Error:", err);
      
      // Check for a specific error message from the backend response body
      const errorMessage = err.response?.data?.message || 'Invalid credentials.';
      
      // Check for HTTP status code 
      if (err.response && err.response.status === 401) {
        setError(errorMessage);
      } else {
        // Handle network errors, server down, etc.
        setError('Could not connect to the server. Please try again.');
      }
    }
  };

  return (
    // Centering the entire page content vertically and horizontally
    
    <div className="d-flex justify-content-center align-items-center  login-background">
        
      {/* 1. Login Card Container (Paper alternative) */}
      <div className="card shadow-lg p-3 mt-5 " style={{ maxWidth: '400px', width: '100%' }}>
        
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Admin Login</h2>

          {/* Optional: Lock Icon (using a placeholder if no icon library is installed) */}
          <div className="text-center mb-3">
            <span className="p-2 rounded-circle bg-primary text-white d-inline-block" style={{ fontSize: '1.5rem' }}>
                <i className="bi bi-lock-fill"></i> {/* Replace with a real icon library class like Bootstrap Icons if desired */}
            </span>
          </div>
          
          <form onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                autoFocus
              />
            </div>
            
            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                
                {/* Show/Hide Password Button (Input Adornment) */}
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {/* Error Message Display */}
              {error && <div className="invalid-feedback d-block">{error}</div>}
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
            >
              Sign In
            </button>
            
        

          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;