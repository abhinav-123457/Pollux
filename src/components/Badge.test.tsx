import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge Component', () => {
  it('renders children text', () => {
    render(<Badge>Primary</Badge>);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('applies variant styling', () => {
    const { container: primaryContainer } = render(
      <Badge variant="primary">Primary</Badge>
    );
    const primaryBadge = primaryContainer.firstChild as HTMLElement;
    expect(primaryBadge).toBeInTheDocument();

    const { container: secondaryContainer } = render(
      <Badge variant="secondary">Secondary</Badge>
    );
    const secondaryBadge = secondaryContainer.firstChild as HTMLElement;
    expect(secondaryBadge).toBeInTheDocument();
  });

  it('has proper badge classes', () => {
    const { container } = render(<Badge>Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('uppercase', 'inline-block');
  });

  it('accepts custom className', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('custom-class');
  });
});
