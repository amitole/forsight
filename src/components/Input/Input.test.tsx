import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input {...defaultProps} placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('test value');
  });

  it('displays the provided value', () => {
    render(<Input {...defaultProps} value="test value" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });

  it('renders with different input types', () => {
    const { rerender } = render(<Input {...defaultProps} type="email" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input {...defaultProps} type="password" />);
    input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows required indicator when required is true', () => {
    render(<Input {...defaultProps} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Input {...defaultProps} error="This is an error message" />);
    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('applies error class when error is present', () => {
    render(<Input {...defaultProps} error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input {...defaultProps} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });





  it('handles email validation correctly', () => {
    render(<Input {...defaultProps} type="email" />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('invalid-email');
  });

  it('handles number input correctly', () => {
    render(<Input {...defaultProps} type="number" />);
    const input = screen.getByRole('spinbutton');
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('123');
  });
}); 