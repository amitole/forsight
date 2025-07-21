import { useState, useRef, useEffect } from "react";
import { ArrowDown, X } from "lucide-react";
import { SelectProps, SelectOption } from "./types";
import { filterOptions } from "./utils/filterOptions";
import "./Select.css";

const Select = ({
  options,
  multiple = false,
  placeholder = "Select...",
  value,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const filteredOptions = filterOptions(options, search);

  const isSelected = (option: SelectOption) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(option.value);
    }
    return value === option.value;
  };

  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      if (!Array.isArray(value)) return;
      if (value.includes(option.value)) {
        onChange(value.filter((v) => v !== option.value));
      } else {
        onChange([...value, option.value]);
      }
    } else {
      onChange(option.value);
      setOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (!multiple) return;
    if (Array.isArray(value) && value.length === filteredOptions.length) {
      onChange([]);
    } else {
      onChange(filteredOptions.map((opt) => opt.value));
    }
  };

  const selectedLabels = multiple
    ? options
        .filter((opt) => Array.isArray(value) && value.includes(opt.value))
        .map((opt) => opt.label)
        .join(", ")
    : options.find((opt) => opt.value === value)?.label;

  const ArrowIcon = (
    <ArrowDown 
      className={`select-arrow ${open ? "up" : "down"}`}
      size={16}
    />
  );

  return (
    <div className="select-container" ref={ref}>
      <div
        className={`select-control${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
        }}
      >
        <span className="select-placeholder">
          {selectedLabels || placeholder}
        </span>
        {ArrowIcon}
      </div>
      {open && (
        <div className="select-dropdown">
          <div className="select-search-container">
            <input
              className="select-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            {search && (
              <button
                className="select-search-clear"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearch("");
                }}
                type="button"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {multiple && (
            <div className="select-all-option" onClick={handleSelectAll}>
              <input
                type="checkbox"
                checked={
                  Array.isArray(value) &&
                  value.length === filteredOptions.length &&
                  filteredOptions.length > 0
                }
                readOnly
              />
              <span>
                {Array.isArray(value) && value.length === filteredOptions.length
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </div>
          )}
          <div className="select-options">
            {filteredOptions.length === 0 ? (
              <div className="select-no-options">No options</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`select-option${
                    isSelected(option) ? " selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isSelected(option)}
                      readOnly
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
