# React TypeScript Assessment

This assessment is designed to evaluate your React and TypeScript skills at an intermediate level. You'll be building a data management application that demonstrates your understanding of React concepts, TypeScript, API integration, and error handling.

## Assessment Overview

You will be building a **User Management Dashboard** that allows users to:
- View a list of users
- Add new users
- Edit existing users
- Delete users
- Handle loading states
- Implement error handling
- Write unit tests

## Technical Requirements

### Core Technologies
- React 18+
- TypeScript
- React Query (for API data fetching)
- Jest & React Testing Library (for testing)
- Tailwind CSS (for styling)

### API Endpoints
You'll be working with a mock API that provides the following endpoints:

```typescript
// Base URL: https://api.example.com

// Get all users
GET /users

// Get single user
GET /users/:id

// Create user
POST /users
Body: {
  name: string;
  email: string;
  role: string;
}

// Update user
PUT /users/:id
Body: {
  name: string;
  email: string;
  role: string;
}

// Delete user
DELETE /users/:id
```

## Project Structure

```
src/
  ├── components/     # Create your reusable components here
  ├── hooks/         # Create your custom hooks here
  ├── services/      # Implement your API services here
  ├── types/         # Define your TypeScript types here
  ├── utils/         # Add any utility functions here
  ├── tests/         # Write your tests here
  └── App.tsx        # Implement your main application component
```

## Tasks

1. **Setup & Configuration (10 points)**
   - Set up the project with TypeScript
   - Configure React Query
   - Set up testing environment
   - Configure Tailwind CSS

2. **TypeScript Implementation (15 points)**
   - Define proper types for all components and functions
   - Implement interfaces for API responses
   - Use proper type guards where necessary

3. **API Integration (20 points)**
   - Implement API service layer
   - Set up React Query hooks for data fetching
   - Handle loading and error states
   - Implement proper error boundaries

4. **Component Development (25 points)**
   - Create reusable components
   - Implement form validation
   - Handle user interactions
   - Implement proper state management

5. **Testing (20 points)**
   - Write unit tests for components
   - Test API integration
   - Test error handling
   - Test user interactions

6. **Code Quality (10 points)**
   - Follow React best practices
   - Implement proper error handling
   - Write clean, maintainable code
   - Add proper documentation

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Submission

1. Fork this repository
2. Complete the assessment
3. Submit a pull request with your implementation

## Evaluation Criteria

Your submission will be evaluated based on:
- Code quality and organization
- TypeScript implementation
- Error handling
- Testing coverage
- Component reusability
- API integration
- User experience

## Time Limit

This assessment should take approximately 4-6 hours to complete.

## Notes

- You may use any additional libraries you find necessary
- Focus on writing clean, maintainable code
- Ensure all tests pass
- Document any assumptions or decisions made
