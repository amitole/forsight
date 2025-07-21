export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  multiple?: boolean;
  placeholder?: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
} 