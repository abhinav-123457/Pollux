import { render, screen } from '@testing-library/react';
import AIAssistant from './AIAssistant';
import '../i18n/config';

describe('AIAssistant page', () => {
  it('renders header and input', () => {
    render(<AIAssistant />);
    expect(screen.getByText(/AI Assistant/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type your election question/i)).toBeInTheDocument();
  });
});
