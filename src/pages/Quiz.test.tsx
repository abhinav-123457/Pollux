import React from 'react';
import { render, screen } from '@testing-library/react';
import Quiz from './Quiz';
import '../i18n/config';

describe('Quiz page', () => {
  it('renders quiz title or CTA', () => {
    render(<Quiz />);
    // Quiz may render different states; check for either known strings
    expect(
      screen.getByText(/Knowledge Quiz|Start Quiz|Your Score/i)
    ).toBeTruthy();
  });
});
