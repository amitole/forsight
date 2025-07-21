import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Select from './Select';
import { SelectOption } from './types';

describe('Select Component', () => {
  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const defaultProps = {
    options: mockOptions,
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder', () => {
    render(<Select {...defaultProps} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('selects single option correctly', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('option1');
  });

  it('displays selected option label', () => {
    render(<Select {...defaultProps} value="option1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles multiple selection', () => {
    const { rerender } = render(<Select {...defaultProps} multiple value={[]} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['option1']);
    
    // Update the component with the new value
    rerender(<Select {...defaultProps} multiple value={['option1']} />);
    
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  it('shows checkboxes in multiple mode', () => {
    render(<Select {...defaultProps} multiple value={[]} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('filters options when searching', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Option 1' } });
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('shows clear button in search when there is text', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  it('shows "Select All" option in multiple mode', () => {
    render(<Select {...defaultProps} multiple value={[]} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    expect(screen.getByText('Select All')).toBeInTheDocument();
  });

  it('selects all options when "Select All" is clicked', () => {
    render(<Select {...defaultProps} multiple value={[]} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    fireEvent.click(screen.getByText('Select All'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(['option1', 'option2', 'option3']);
  });

  it('deselects all options when "Deselect All" is clicked', () => {
    render(<Select {...defaultProps} multiple value={['option1', 'option2', 'option3']} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    fireEvent.click(screen.getByText('Deselect All'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });

  it('shows "No options" when filtered results are empty', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.click(selectControl);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    expect(screen.getByText('No options')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<Select {...defaultProps} />);
    const selectControl = screen.getByRole('button');
    
    fireEvent.keyDown(selectControl, { key: 'Enter' });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    fireEvent.keyDown(selectControl, { key: ' ' });
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('displays multiple selected values correctly', () => {
    render(<Select {...defaultProps} multiple value={['option1', 'option2']} />);
    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
  });
}); 