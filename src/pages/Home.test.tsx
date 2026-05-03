import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import '../i18n/config';

describe('Home page', () => {
  it('renders hero and Google Services proof', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Understand Every Vote/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Services In Action/i)).toBeInTheDocument();
  });
});
