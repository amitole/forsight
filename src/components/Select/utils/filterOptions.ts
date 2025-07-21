import { SelectOption } from '../types';

export function filterOptions(options: SelectOption[], search: string): SelectOption[] {
  if (!search || !search.trim()) return options;
  return options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase()) ||
    option.value.toLowerCase().includes(search.toLowerCase())
  );
} 