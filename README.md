# Lujay_Autos_Api

## Overview
The **Lujay_Autos_Api** is a RESTful Api built in NodeJs(Express) that handles the backend infrstructure for the AutoCity platform. It aims at simplifying global automotive experiences through technology.

## Features:
- **User Authentication:** Secure user registration and login system with JWT based authentication.
- **Vehicle Listings:** 
  - Create vehicle listings with validation and media upload.
  - Retrieve all vehicle listings or a single vehicle by ID.
  - Update vehicle listings with partial updates, filtering out undefined fields.
  - Delete vehicle listings with ownership check (users can only delete their own vehicles).
- **Media Upload:** Upload images and videos of vehicles to Cloudinary (up to 6 files per listing).
- **Role-Based Authorization:** (Admin && User) 
  - Admins are authorized to create and manage vehicle listings.
  - Admin are authorized to update and delete only vehicle lsitings that belong to him.
  - Regular users have restricted access and can only fetch vehicle listings.
  - Regular users are not authorized to create or manage a vehicle listing.
- **Validation and Error Handling:** 
  - Zod validation for request bodies and route parameters for all routes.
  - Middleware to check validity and ownership(an admin can only modify a listing that belongs to him).
  - Proper HTTP error handling with consistent responses.
- **Database Integration:** MongoDB with Mongoose schemas for vehicles, users, and media.

 
## Tech Stack

- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Zod for input validation
  - Multer for File Processing
  - Cloudinary for Cloud Storage

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

All API endpoints can be referenced in the swagger doc at: http://localhost:8000/api/docs/#/

## Versioning

This project is versioned to ensure backward compatibility and easy maintenance. The current version is [version 1].

## Route naming conventions

all routes should have a prefix of

```bash
  api/v1
```
