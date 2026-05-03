import React from 'react';
import { render, screen } from '@testing-library/react';
import Analytics from './Analytics';
import '../i18n/config';

describe('Analytics page', () => {
  it('renders analytics header', () => {
    render(<Analytics />);
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
  });
});
