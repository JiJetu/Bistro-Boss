# Bistro Boss - Restaurant Management System

Welcome to the GitHub repository of Bistro Boss, a comprehensive web application designed for both customers and administrators to streamline operations in a restaurant setting. This system allows users to register, log in, and place orders with ease, while also providing robust admin features for product and user management.

## Features

### For Customers
- **User Authentication**: Secure registration and login functionality, including Google sign-in options for ease of access.
- **Product Cart**: Users can browse the restaurant's offerings, add products to their cart, and proceed to checkout.
- **Payments**: Supports card payment methods, allowing customers to pay for their orders online using Stripe.

### For Administrators
- **Admin Panel**: A dedicated dashboard for administrators to add, manage, and update product listings.
- **User Management**: View all registered users and set roles, enhancing control over who can access certain functionalities within the system.
- **Analytics**: Visualize customer reviews and product popularity through pie charts and bar charts, aiding in decision-making processes.

## Technologies Used

- **Frontend**: React with Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Auth for handling user registration, login, and Google sign-in
- **Payment Gateway**: Stripe for processing card payments
- **Data Visualization**: Recharts for generating interactive and responsive charts

## Getting Started

Follow these steps to get a local copy up and running:

|                                                                                      | 
| ------------------------------------------------------------------------------------ |
| **Clone the repository:**                                                            |
| `https://github.com/JiJetu/Bistro-Boss.git`                         |
| **Navigate to the project directory:**                                               |
| `cd bistro-boss`                                                                     |
| **Install dependencies:**                                                            |
| `npm install`                                                                        |
| **Set up Backend:**                                                                  |
| - Ensure you have MongoDB installed and running.                                     |
| - Set up your MongoDB connection URI in a `.env` file.                               |
| **Set up Firebase:**                                                                 |
| - Create a Firebase project in the Firebase console.                                 |
| - Add your project's Firebase configuration to your React application.               |
| - Ensure that Firestore and Firebase Authentication are enabled.                     |
| **Set up Stripe:**                                                                   |
| - Create a Stripe account and obtain API keys.                                       |
| - Integrate Stripe into your backend for processing payments.                        |
| **Start the server:**                                                                |
| `npm start`                                                                          |
| **Navigate to `http://localhost:5000` in your browser** 

## Live Site 

Experience Bistro Boss live [here](https://bistro-boss-e954b.web.app/).


