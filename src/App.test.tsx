import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders user registration form", () => {
  render(<App />);
  const formElement = screen.getByText("User Registration Form");
  expect(formElement).toBeInTheDocument();
});
