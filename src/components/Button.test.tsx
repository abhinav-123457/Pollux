import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Button</Button>);
    const button = screen.getByRole('button');
    button.click();
    expect(clicked).toBe(true);
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('border-2', 'border-red-600');
  });

  it('supports aria-label', () => {
    render(<Button ariaLabel="Close dialog">×</Button>);
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('has correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
