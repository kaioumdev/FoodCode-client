<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->

# FoodCode Frontend

## Overview
The FoodCode frontend is a React-based application designed to provide a seamless user experience for browsing menus, managing carts, making payments, and handling admin functionalities. It is built using React.js, Tailwind CSS, React Router, and integrates with the backend API for authentication, menu management, and order processing.

## Features
- **User Authentication**: Secure login and signup using JWT authentication.
- **Menu Display**: Users can browse available menu items with a visually appealing UI.
- **Cart System**: Add and remove items from the cart before proceeding to checkout.
- **Stripe Payment Integration**: Secure checkout process using Stripe.
- **Admin Panel**: Manage menu items, view order statistics, and handle user roles.
- **Responsive Design**: Optimized for mobile and desktop screens using Tailwind CSS.

## Technologies Used
- **React.js**: Component-based UI development
- **React Router**: For handling navigation
- **Tailwind CSS**: For styling and responsive design
- **Redux/React Context API**: State management (if applicable)
- **Axios**: For API requests
- **Stripe**: Payment processing

## Installation & Setup

### Prerequisites
- Node.js installed
- Backend API running (Ensure backend is set up and running before starting the frontend)

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd foodcode-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
   ```env
   REACT_APP_API_URL=<your-backend-api-url>
   REACT_APP_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
   ```
4. Start the application:
   ```sh
   npm start
   ```
5. The application will run on `http://localhost:3000`

## Project Structure
```
foodcode-frontend/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages (Home, Menu, Cart, etc.)
│   ├── hooks/         # Custom hooks
│   ├── context/       # Context API for state management
│   ├── services/      # API calls and integrations
│   ├── styles/        # Global styles and Tailwind configuration
│   ├── App.js         # Main app component
│   ├── index.js       # Entry point
│── public/
│── package.json
│── .env
│── README.md
```

## API Integration
The frontend communicates with the backend via Axios for authentication, menu management, and order handling. API endpoints are defined in the `services/` directory.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Added new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

