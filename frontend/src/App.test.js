import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App hero', () => {
  test('renders the product headline', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /real-time whiteboard/i })).toBeInTheDocument();
  });
});
