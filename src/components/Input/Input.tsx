import "./Input.css";

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel";
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  className = "",
}: InputProps) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input-field ${error ? "error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;
