# Select Component Demo

A modern, accessible React form application featuring a custom Select component with search functionality, multi-selection capabilities, and comprehensive unit testing.

## 🚀 Features

- **Custom Select Component**: Dropdown with search, multi-selection, and keyboard navigation
- **Reusable Input Component**: Type-safe input fields with validation and error handling
- **Form Validation**: Real-time validation with user-friendly error messages
- **Modern UI**: Clean, responsive design with smooth animations
- **Accessibility**: Full ARIA support and keyboard navigation
- **Comprehensive Testing**: 50+ unit tests using React Testing Library and Jest
- **TypeScript**: Full type safety throughout the application

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Lucide React** for modern icons
- **React Testing Library** for component testing
- **Jest** for test running
- **CSS3** with modern styling and animations

## 📋 Components

### Select Component
- Single and multiple selection modes
- Real-time search filtering
- Select All/Deselect All functionality
- Keyboard navigation support
- Clear search button
- Customizable options and placeholders

### Input Component
- Multiple input types (text, email, password, number, tel)
- Built-in validation and error display
- Required field indicators
- Accessible labels and ARIA attributes
- Customizable styling

### Form Component
- User registration form with validation
- Integration of Select and Input components
- Console logging of form data
- Real-time error clearing

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd select-component-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## 📦 Available Scripts

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## 🎯 Usage Examples

### Basic Select Component
```tsx
import Select from './components/Select/Select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<Select
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>
```

### Multiple Selection
```tsx
<Select
  options={options}
  multiple
  value={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select multiple options"
/>
```

### Input Component
```tsx
import Input from './components/Input/Input';

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={setEmail}
  required
  error={emailError}
/>
```

## 🧪 Test Coverage

The project includes comprehensive unit tests:

- **Input Component**: 12 tests covering rendering, validation, and user interactions
- **Select Component**: 15 tests covering selection, search, and accessibility
- **Form Component**: 12 tests covering form validation and submission
- **Utility Functions**: 12 tests covering filtering logic
- **App Component**: 1 test covering main app rendering

## 📁 Project Structure

```
src/
├── components/
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.css
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── Select/
│   │   ├── Select.tsx
│   │   ├── Select.css
│   │   ├── Select.test.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── filterOptions.ts
│   │       └── filterOptions.test.ts
│   └── Form/
│       ├── Form.tsx
│       ├── Form.css
│       ├── Form.test.tsx
│       └── index.ts
├── App.tsx
├── App.css
├── App.test.tsx
└── setupTests.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
