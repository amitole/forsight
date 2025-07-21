import { filterOptions } from './filterOptions';
import { SelectOption } from '../types';

describe('filterOptions', () => {
  const mockOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
  ];

  it('returns all options when search is empty', () => {
    const result = filterOptions(mockOptions, '');
    expect(result).toEqual(mockOptions);
  });

  it('returns all options when search is whitespace only', () => {
    const result = filterOptions(mockOptions, '   ');
    expect(result).toEqual(mockOptions);
  });

  it('filters options by label (case insensitive)', () => {
    const result = filterOptions(mockOptions, 'apple');
    expect(result).toEqual([{ value: 'apple', label: 'Apple' }]);
  });

  it('filters options by partial label match', () => {
    const result = filterOptions(mockOptions, 'ber');
    expect(result).toEqual([
      { value: 'elderberry', label: 'Elderberry' }
    ]);
  });

  it('filters options by value (case insensitive)', () => {
    const result = filterOptions(mockOptions, 'BANANA');
    expect(result).toEqual([{ value: 'banana', label: 'Banana' }]);
  });

  it('returns empty array when no matches found', () => {
    const result = filterOptions(mockOptions, 'xyz');
    expect(result).toEqual([]);
  });

  it('handles special characters in search', () => {
    const optionsWithSpecialChars: SelectOption[] = [
      { value: 'test-option', label: 'Test Option' },
      { value: 'test_option', label: 'Test_Option' },
      { value: 'test.option', label: 'Test.Option' },
    ];

    const result = filterOptions(optionsWithSpecialChars, 'test-');
    expect(result).toEqual([{ value: 'test-option', label: 'Test Option' }]);
  });

  it('handles numbers in search', () => {
    const optionsWithNumbers: SelectOption[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option10', label: 'Option 10' },
    ];

    const result = filterOptions(optionsWithNumbers, '1');
    expect(result).toEqual([
      { value: 'option1', label: 'Option 1' },
      { value: 'option10', label: 'Option 10' },
    ]);
  });

  it('handles empty options array', () => {
    const result = filterOptions([], 'test');
    expect(result).toEqual([]);
  });

  it('handles null or undefined search', () => {
    const result1 = filterOptions(mockOptions, null as any);
    const result2 = filterOptions(mockOptions, undefined as any);
    
    expect(result1).toEqual(mockOptions);
    expect(result2).toEqual(mockOptions);
  });
}); 