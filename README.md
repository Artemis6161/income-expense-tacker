## Personal Finance & Early Retirement Tracker
A comprehensive web application designed to help you manage your income and expenses, track your financial health, and plan for early retirement. This tool provides a clear overview of your cash flow, calculates your net gain/loss, and projects your financial independence journey.

## Table of Contents
+ Live Demo

+ Key Features

+ How It Works

+ Technologies Used

+ Getting Started

+ Prerequisites

+ Installation

+ Usage

+ Screenshots

+ Contributing

+ License

## Live Demo
https://income-expense-tacker-frontend.onrender.com/

## Key Features
Authentication: Secure user registration and login system.

* Register: New users can create an account with a unique email and password.

* Login: Registered users can securely access their personal dashboard.

* Logout: Users can safely end their session.

* User Profile: A dedicated section for users to view and manage their account details.

* Income & Expense Tracking:

* Easily add new income or expense records with details like amount, category, and date.

* Delete any transaction with a single click.

* Clean, intuitive interface to view all your transactions in one place.

* Automated Financial Calculations:

* Gain/Loss Summary: The dashboard automatically calculates and displays your total income, total expenses, and the net gain or loss for a given period.

* Early Retirement Projection: Based on your current savings rate and financial goals, the app provides an estimated timeline for achieving Financial Independence and Retiring Early (FIRE).

* Responsive Design: Fully functional on desktops, tablets, and mobile devices.

## How It Works
1. Gain/Loss Calculation
The application aggregates all your added income and expense entries. The core calculation is:

Net Gain/Loss = Total Income - Total Expenses

This gives you an immediate snapshot of your financial performance over time.

2. Early Retirement Projection
The Early Retirement calculator uses a simplified model based on the "4% Rule" and your savings rate. It estimates the size of the investment portfolio you'll need to live off the returns.

Required Nest Egg: (Your Annual Expenses) * 25

Estimated Years to Retirement: This is calculated based on your current portfolio size, annual savings, and an assumed market return rate.

## Technologies Used
- This project is built with a modern technology stack:

- Frontend: React.js, Tailwind CSS

- Backend: Node.js, Express.js

- Database: MongoDB (with Mongoose)

- Authentication: JSON Web Tokens (JWT)

## Getting Started
Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites
Node.js and npm (or yarn)

MongoDB installed and running

## Installation
### Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### Install backend dependencies:

cd server
npm install

### Install frontend dependencies:

cd ../client
npm install

### Set up environment variables:
Create a .env file in the server directory and add the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### Run the application:

* Start the backend server (from the server directory):

npm start

* Start the frontend development server (from the client directory):

npm start

The application should now be running on http://localhost:3000.

## Usage
+ Register for a new account or Login if you already have one.

+ You will be redirected to your Dashboard.

+ Use the "Add Income" or "Add Expense" forms to start logging your transactions.

+ View your Gain/Loss summary on the main dashboard.

+ Navigate to the Early Retirement page to see your projection.

+ Visit your Profile page to view your account details.

+ Logout when you are finished.

## Screenshots
(--)

Dashboard

Add Expense Modal

Early Retirement Calculator

**

**

**

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

* Fork the Project

* Create your Feature Branch (git checkout -b feature/AmazingFeature)

* Commit your Changes (git commit -m 'Add some AmazingFeature')

* Push to the Branch (git push origin feature/AmazingFeature)

* Open a Pull Request

