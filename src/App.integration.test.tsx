import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import './i18n/config';

vi.mock('./lib/firebase', () => ({
  trackPageView: vi.fn(),
}));

vi.mock('./lib/analyticsTracking', () => ({
  trackDeviceInfo: vi.fn(),
  trackPageView: vi.fn(),
}));

describe('App integration', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/timeline');
  });

  it('renders the timeline route and responds to language switching', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Election Timeline' })
    ).toBeInTheDocument();

    const selector = screen.getByLabelText('Language');
    fireEvent.change(selector, { target: { value: 'hi' } });

    expect(
      await screen.findByRole('heading', { name: 'चुनाव समयरेखा' })
    ).toBeInTheDocument();
  });

  it('exposes the main navigation landmarks', async () => {
    render(<App />);

    expect(await screen.findByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation' })
    ).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
