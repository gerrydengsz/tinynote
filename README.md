# TinyNote - Online Note System

A full-stack note-taking application built with Spring Boot and React, featuring user authentication, internationalization (i18n), and CRUD operations for notes.

## Features

- User authentication (register/login)
- Create, read, update, and delete notes
- Internationalization support (English/Chinese)
- JWT-based authentication
- Responsive design
- Secure password storage

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.1.5
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT Authentication
- Maven

### Frontend
- React 18
- React Router 6
- React-Intl
- Axios
- CSS3

## Getting Started

### Prerequisites
- Java 17+
- Node.js 14+
- MySQL 8.0
- Maven

### Database Setup


1. Create a MySQL database named `notesystem`.
2. Update database configuration in `backend/src/main/resources/application.properties`.

### Backend Setup

1. Navigate to the backend directory:
   - Use the command `cd backend` if you are in the root directory of the project.
2. Build the project using Maven:
   - Run `mvn clean install` to download dependencies and build the project.
3. Start the Spring Boot application:
   - You can run the application using `mvn spring-boot:run` or by running the main class in your IDE.

### Frontend Setup
1. Navigate to the frontend directory:
   - Use the command `cd frontend` if you are in the root directory of the project.
2. Install dependencies:
   - Run `npm install` to install all the required Node.js packages.
3. Start the React development server:
   - Run `npm start` to start the development server. The application will be available at `http://localhost:3000`.

## Usage
- Register a new account or log in if you already have one.
- Once logged in, you can create, view, edit, and delete notes.
- Switch between English and Chinese languages using the language selector.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
5. Open a pull request in the original repository.
