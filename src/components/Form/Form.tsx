import { useState } from "react";
import Select from "../Select/Select";
import { SelectOption } from "../Select/types";
import Input from "../Input/Input";
import "./Form.css";

interface FormData {
  name: string;
  email: string;
  interests: string[];
  country: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    interests: [],
    country: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const interestOptions: SelectOption[] = [
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "travel", label: "Travel" },
    { value: "cooking", label: "Cooking" },
    { value: "reading", label: "Reading" },
    { value: "gaming", label: "Gaming" },
    { value: "fitness", label: "Fitness" },
  ];

  const countryOptions: SelectOption[] = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted with data:", formData);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
          required
          error={errors.name}
        />

        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          required
          error={errors.email}
        />

        <div className="form-field">
          <label className="form-label">
            Interests <span className="required">*</span>
          </label>
          <Select
            options={interestOptions}
            multiple={true}
            placeholder="Select your interests"
            value={formData.interests}
            onChange={(value) =>
              handleInputChange("interests", value as string[])
            }
          />
          {errors.interests && (
            <div className="input-error">{errors.interests}</div>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Country <span className="required">*</span>
          </label>
          <Select
            options={countryOptions}
            placeholder="Select your country"
            value={formData.country}
            onChange={(value) => handleInputChange("country", value as string)}
          />
          {errors.country && (
            <div className="input-error">{errors.country}</div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default Form;
