import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If login is successful
        const data = await response.json();
        console.log('Login successful:', data);
        // Handle login success (e.g., redirect, store token if provided, etc.)
      } else {
        // If login failed
        console.error('Login failed');
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}> {/* Fix onSubmit handler */}
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <button type="submit">
                Sign up
              </button>

            </form>

            <p>
              Already have an account?{' '}
              <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
