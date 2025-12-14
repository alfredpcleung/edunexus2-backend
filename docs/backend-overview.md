

# Edunexus2 Backend Overview

This backend powers the Edunexus2 platform, providing a RESTful API for managing users, contacts, projects, and services. It uses Node.js, Express, and MongoDB Atlas, with JWT-based authentication and role-based authorization.

---

## Authentication & Authorization

- JWT-based authentication for secure access.
- Register and login return a JWT token (expires in 24h).
- Protected routes require an Authorization header:
  `Authorization: Bearer <token>`
- Middleware validates token and attaches user info to `req.user` (userId, email, isAdmin).
- Only the resource owner or an admin (isAdmin: true) can update/delete resources.

---

## Data Models

### User
```
{
  firstname: String, required
  lastname: String, required
  email: String, required, unique
  password: String, required (hashed)
  major: String, optional
  year: String, optional
  isAdmin: Boolean, default false
  created: Date, default now
  updated: Date, default now
}
```

### Project
```
{
  title: String, required
  completion: Date, required
  description: String, required
  owner: ObjectId (User), required
  createdAt: Date, auto
  updatedAt: Date, auto
}
```

### Contact
```
{
  firstname: String, required
  lastname: String, required
  email: String, required
  owner: ObjectId (User), required
  createdAt: Date, auto
  updatedAt: Date, auto
}
```

### Service
```
{
  title: String, required
  description: String, required
  review: String, optional
  owner: ObjectId (User), required
  createdAt: Date, auto
  updatedAt: Date, auto
}
```

---

## API Endpoints

### Auth

| Method | Route         | Description         | Body (JSON)                   | Response (JSON)                |
|--------|--------------|---------------------|-------------------------------|--------------------------------|
| POST   | /auth/signup | Register new user   | firstname, lastname, email, password | { message, token, user } |
| POST   | /auth/login  | Login user          | email, password               | { message, token, user }       |

---

### Users

| Method | Route         | Description         | Auth | Body/Params | Response |
|--------|--------------|---------------------|------|------------|----------|
| GET    | /users/      | List all users      | No   |            | [users]  |
| GET    | /users/:id   | Get user by ID      | No   | :id        | user     |
| POST   | /users/      | Create user         | No   | user fields| user     |
| PUT    | /users/:id   | Update user         | Yes  | :id, fields| user     |
| DELETE | /users/:id   | Delete user         | Yes  | :id        | {msg}    |
| DELETE | /users/      | Delete all users    | Yes  |            | {msg}    |

---

### Projects

| Method | Route           | Description         | Auth | Body/Params | Response |
|--------|----------------|---------------------|------|-------------|----------|
| GET    | /projects/     | List all projects   | No   |             | [projects]|
| GET    | /projects/:id  | Get project by ID   | No   | :id         | project  |
| POST   | /projects/     | Create project      | Yes  | fields      | project  |
| PUT    | /projects/:id  | Update project      | Yes  | :id, fields | project  |
| DELETE | /projects/:id  | Delete project      | Yes  | :id         | {msg}    |
| DELETE | /projects/     | Delete all projects | Yes  |             | {msg}    |

---

### Contacts

| Method | Route           | Description         | Auth | Body/Params | Response |
|--------|----------------|---------------------|------|-------------|----------|
| GET    | /contacts/     | List all contacts   | No   |             | [contacts]|
| GET    | /contacts/:id  | Get contact by ID   | No   | :id         | contact  |
| POST   | /contacts/     | Create contact      | Yes  | fields      | contact  |
| PUT    | /contacts/:id  | Update contact      | Yes  | :id, fields | contact  |
| DELETE | /contacts/:id  | Delete contact      | Yes  | :id         | {msg}    |
| DELETE | /contacts/     | Delete all contacts | Yes  |             | {msg}    |

---

### Services

| Method | Route           | Description         | Auth | Body/Params | Response |
|--------|----------------|---------------------|------|-------------|----------|
| GET    | /services/     | List all services   | No   |             | [services]|
| GET    | /services/:id  | Get service by ID   | No   | :id         | service  |
| POST   | /services/     | Create service      | Yes  | fields      | service  |
| PUT    | /services/:id  | Update service      | Yes  | :id, fields | service  |
| DELETE | /services/:id  | Delete service      | Yes  | :id         | {msg}    |
| DELETE | /services/     | Delete all services | Yes  |             | {msg}    |

---

## Special Business Logic & Constraints

- Passwords are hashed before storage.
- Email must be unique for users.
- JWT token required for all modifying operations (POST, PUT, DELETE) except user creation.
- Only authenticated users can create, update, or delete projects, contacts, and services.
- Only the resource owner or an admin can update/delete resources.
- Error responses use standard HTTP status codes and JSON error messages.
- Set isAdmin manually in the database for initial admin users if needed.

---

Let the team know if you need more details on any endpoint, model, or flow!
