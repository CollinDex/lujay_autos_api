# Lujay_Autos_Api

## Overview
The **Lujay_Autos_Api** is a RESTful Api built in NodeJs(Express) that handles the backend infrstructure for the AutoCity platform. It aims at simplifying global automotive experiences through technology.

## Features:
- **User Authentication:** Secure user registration and login system.
- **Profile Management:** Create and update user profiles with personal data.
- **Vehicle Listings:** Create, update, retreve and delete vehicle listings.
- **Media Upload:** Upload images of vehicles to Cloudinary.
- **Role Based authorization**
- **Error Handling and validation for all endpoints**
- **Database Integration:**
 
## Tech Stack

- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Zod for input validation

## Getting Started

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [Git](https://git-scm.com/)


## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using Git.

```sh
git clone https://github.com/your-username/[app-name].git
cd [app-name]
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies.

```sh
yarn
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your environment-specific variables. You can use the provided `.env.example` file as a reference.

```sh
cp .env.example .env
```

Edit the `.env` file to match your environment configuration.

### 4. Run the Development Server

Start the development server with the following command. This will also watch for any changes in your code and automatically restart the server.

```sh
yarn start:dev
```

### 5. Run the Production Server

To run the application in a production environment, use the following command:

```sh
yarn start
```

### 7. Verify the Setup

Open your browser and navigate to `http://localhost:8080` to verify that the application is running correctly.

## API Endpoints

All API endpoints can be referenced in the [API Reference](API_REFERENCE.md) document.

## Versioning

This project is versioned to ensure backward compatibility and easy maintenance. The current version is [version 1].

## Route naming conventions

all routes should have a prefix of

```bash
  api/v1
```
