# React-Node Recipe App 🍲

Welcome to the **React-Node Recipe App**! This application allows users to view, add, and manage their favorite recipes. It is built using **React** for the frontend and **Node.js** with **Prisma** for the backend, offering a complete full-stack experience.

## Table of Contents

1. [Getting Started 🚀](#getting-started)
2. [Technologies Used](#technologies-used)
3. [Setting Up the Project](#setting-up-the-project)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Features](#features)
7. [License](#license)
8. [Contact](#contact)

## Getting Started 🚀

To get the **React-Node Recipe App** running locally, follow the steps below:

### Prerequisites

Make sure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **PostgreSQL** database
- A [Spoonacular API key](https://spoonacular.com/food-api) for fetching recipe data

### Setting Up the Project

1. **Clone the Repository**:

   First, clone the repository to your local machine:
   ```bash
   git clone https://github.com/ebrahimbeiati/recipe-app.git
   cd react-node-recipe-app
   ```

2. **Backend Setup**:

   - Navigate to the **backend** directory:
     ```bash
     cd backend
     ```

   - Install the necessary dependencies:
     ```bash
     npm install
     ```

   - **Configure Spoonacular API**:
     - Obtain your [Spoonacular API key](https://spoonacular.com/food-api).
     - Add the API key to the `.env` file:
       ```bash
       API_KEY=your_spoonacular_api_key
       ```

   - **ElephantSQL Setup**:
     - Create a PostgreSQL database instance on [ElephantSQL](https://www.elephantsql.com/).
     - Copy the **connection string** provided by ElephantSQL.

   - **Prisma Setup**:
     - Open the `.env` file and replace the `DATABASE_URL` value with your ElephantSQL connection string.
     - Initialize Prisma and generate the Prisma client:
       ```bash
       npx prisma init
       npx prisma generate
       ```

   - Start the backend server:
     ```bash
     npm start
     ```

   The backend server should now be running on `http://localhost:5000` (or the port defined in your `.env` file).

3. **Frontend Setup**:

   - Navigate to the **frontend** directory:
     ```bash
     cd frontend
     ```

   - Install the frontend dependencies:
     ```bash
     npm install
     ```

   - Start the frontend development server:
     ```bash
     npm run dev
     ```

   The frontend application should now be running at `http://localhost:3000` (or the port defined in your `vite.config.js` file).

## Technologies Used

- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A fast build tool for modern web development.
  - **Tailwind CSS**: A utility-first CSS framework for styling the frontend.
- **Backend**:
  - **Node.js**: JavaScript runtime used for the backend server.
  - **Express**: Web application framework for Node.js.
  - **Prisma**: ORM to interact with the PostgreSQL database.
  - **PostgreSQL**: Relational database for storing recipe and user data.
- **API**:
  - **Spoonacular API**: Provides recipe data, including ingredients, nutritional information, and more.

## Features

- **View Recipes**: Browse through a collection of recipes.
- **Add Recipes**: Users can add their own recipes.
- **Manage Favorites**: Save and manage favorite recipes for later viewing.
- **Search Recipes**: Filter recipes by name, ingredients, or categories.
- **User Authentication**: Users can sign up, log in, and securely store their data.

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

## Contact

For any questions, issues, or suggestions, feel free to reach out:

- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub**: [github.com/ebrahimbeiati](https://github.com/ebrahimbeiati)

Enjoy building and exploring the **React-Node Recipe App**! 🍲