# Portfolio API (Contacts, Projects, Services, Users)

## Description
This project is a RESTful API built with **Node.js, Express, and MongoDB Atlas**.  
It manages four entities — **Contacts, Projects, Services, and Users** — each with full CRUD functionality.  
The API was developed as part of coursework to demonstrate backend engineering skills, database integration, and professional testing practices.

---

## Features
- CRUD operations for:
  - Contacts
  - Projects
  - Services
  - Users
- Centralized error handling middleware
- MongoDB Atlas integration
- Organized MVC structure (Models, Controllers, Routes)

---

## Installation & Setup
```bash
# Clone the repo
git clone https://github.com/<your-username>/<your-repo-name>.git

# Navigate into the folder
cd <your-repo-name>

# Install dependencies
npm install

# Create a .env file with your MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# Run the server
npm run dev

---

## API Endpoints
Each entity supports the same CRUD pattern:
- GET /api/<entity> → Get all
- GET /api/<entity>/:id → Get by ID
- POST /api/<entity> → Create new
- PUT /api/<entity>/:id → Update by ID
- DELETE /api/<entity>/:id → Delete by ID
- DELETE /api/<entity> → Delete all

Entities: contacts, projects, services, users

---

## Testing
- All endpoints tested with Thunder Client in VS Code
- 28 screenshots (7 per entity) included in submission PDF
- Extra screenshot shows centralized error handling in action

---

## Author
- COMP229 Web Application Development (SEC. 003)
- Lab Assignment 2
- Name: Alfred Leung
- Student ID: 301501936
- Date: 16 October 2025