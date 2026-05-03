import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AIAssistant from './AIAssistant';
import '../i18n/config';

// Mock scrollIntoView on DOM elements
Element.prototype.scrollIntoView = vi.fn();

describe('AIAssistant page', () => {
  it('renders header and input', () => {
    render(<AIAssistant />);
    expect(screen.getByText(/AI Assistant/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type your election question/i)).toBeInTheDocument();
  });
});
