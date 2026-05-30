import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render the login page by default', () => {
    render(<App />);
    // The test failed because "Sign In" appears multiple times (Heading and Button)
    const loginHeadings = screen.getAllByText(/Sign In/i);
    expect(loginHeadings.length).toBeGreaterThan(0);
  });
});
