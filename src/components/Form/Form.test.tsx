import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';

// Mock console.log to capture form submission data
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  it('renders form with all fields', () => {
    render(<Form />);
    
    expect(screen.getByText('User Registration Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText('Interests')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument();
  });

  it('shows required indicators for required fields', () => {
    render(<Form />);
    
    const requiredIndicators = screen.getAllByText('*');
    expect(requiredIndicators.length).toBeGreaterThan(0);
  });

  it('validates required fields on submission', async () => {
    render(<Form />);
    
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Please select a country')).toBeInTheDocument();
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(<Form />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    render(<Form />);
    
    // Fill in required fields
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    // Select country
    const countrySelect = screen.getByText(/select your country/i);
    fireEvent.click(countrySelect);
    
    const countryOption = screen.getByText('United States');
    fireEvent.click(countryOption);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('Form submitted with data:', {
        name: 'John Doe',
        email: 'john@example.com',
        interests: [],
        country: 'us'
      });
    });
  });

  it('handles multiple interests selection', async () => {
    render(<Form />);
    
    // Fill in required fields
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    // Select country
    const countrySelect = screen.getByText(/select your country/i);
    fireEvent.click(countrySelect);
    fireEvent.click(screen.getByText('United States'));
    
    // Select interests
    const interestsSelect = screen.getByText(/select your interests/i);
    fireEvent.click(interestsSelect);
    
    fireEvent.click(screen.getByText('Technology'));
    fireEvent.click(screen.getByText('Sports'));
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('Form submitted with data:', {
        name: 'John Doe',
        email: 'john@example.com',
        interests: ['technology', 'sports'],
        country: 'us'
      });
    });
  });

  it('clears errors when user starts typing', async () => {
    render(<Form />);
    
    // Submit empty form to show errors
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    
    // Start typing in name field
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('handles search in interests dropdown', async () => {
    render(<Form />);
    
    const interestsSelect = screen.getByText(/select your interests/i);
    fireEvent.click(interestsSelect);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Technology' } });
    
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.queryByText('Sports')).not.toBeInTheDocument();
  });

  it('handles search in country dropdown', async () => {
    render(<Form />);
    
    const countrySelect = screen.getByText(/select your country/i);
    fireEvent.click(countrySelect);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'United States' } });
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });

  it('uses select all functionality for interests', async () => {
    render(<Form />);
    
    const interestsSelect = screen.getByText(/select your interests/i);
    fireEvent.click(interestsSelect);
    
    const selectAllOption = screen.getByText('Select All');
    fireEvent.click(selectAllOption);
    
    // Verify that select all was called by checking the form state
    // The checkboxes will be visible in the dropdown
    expect(screen.getByText('Deselect All')).toBeInTheDocument();
  });

  it('handles form submission with all fields filled', async () => {
    render(<Form />);
    
    // Fill name
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    
    // Fill email
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    
    // Select interests
    const interestsSelect = screen.getByText(/select your interests/i);
    fireEvent.click(interestsSelect);
    fireEvent.click(screen.getByText('Music'));
    fireEvent.click(screen.getByText('Travel'));
    
    // Select country
    const countrySelect = screen.getByText(/select your country/i);
    fireEvent.click(countrySelect);
    fireEvent.click(screen.getByText('Canada'));
    
    // Submit
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('Form submitted with data:', {
        name: 'Jane Smith',
        email: 'jane@example.com',
        interests: ['music', 'travel'],
        country: 'ca'
      });
    });
  });
}); 