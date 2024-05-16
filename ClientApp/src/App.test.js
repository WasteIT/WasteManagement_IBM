import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
/**
 * Test to ensure that the main App component renders without crashing.
 * 
 * @returns {Promise<void>} Promise resolving after rendering completes.
 */

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  await new Promise(resolve => setTimeout(resolve, 1000));
});
