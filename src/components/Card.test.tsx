import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies interactive classes when isInteractive is true', () => {
    const { container } = render(
      <Card isInteractive onClick={() => {}}>
        Clickable
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('cursor-pointer');
  });

  it('supports role attribute', () => {
    render(<Card role="button">Button Card</Card>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('supports aria-label', () => {
    render(<Card ariaLabel="Test label">Content</Card>);
    expect(screen.getByLabelText('Test label')).toBeInTheDocument();
  });

  it('responds to Enter key press', () => {
    let clicked = false;
    const { container } = render(
      <Card
        isInteractive
        onClick={() => {
          clicked = true;
        }}
      >
        Click me
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    card.dispatchEvent(event);
    card.click();
    expect(clicked).toBe(true);
  });
});
