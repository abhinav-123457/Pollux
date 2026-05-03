import { render, screen } from '@testing-library/react';
import Home from './Home';
import '../i18n/config';

describe('Home page', () => {
  it('renders hero and Google Services proof', () => {
    render(<Home />);
    expect(screen.getByText(/Understand Every Vote/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Services In Action/i)).toBeInTheDocument();
  });
});
