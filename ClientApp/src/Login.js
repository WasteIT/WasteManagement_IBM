import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

   
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>Sign in</h1>
            <form onSubmit={onSubmit()}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Sign in
              </button>

            </form>

            <p>
              Don't have an account?{' '}
              <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
