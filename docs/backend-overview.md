
# Backend Overview (Updated for EdNexus)

This documentation provides a reference for the backend API, data models, authentication, and business logic. Share this with the frontend team for integration.

---

## Authentication & Authorization

- JWT-based authentication.
- Register and login return a JWT token (expires in 24h).
- Protected routes require an Authorization header:
  `Authorization: Bearer <token>`
- Middleware validates token and attaches user info to `req.user` (includes userId, email, isAdmin).
- Only the resource owner or an admin (isAdmin: true) can update/delete resources.

---

## Data Models

### User
```js
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
```js
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
```js
{
  firstname: String, required
  lastname: String, required
  email: String, required
  owner: ObjectId (User), required
  createdAt: Date, auto
  updatedAt: Date, auto
}
```

### Service (Course/Review)
```js
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

- The token and user object include isAdmin.

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

- Only the owner or an admin can update/delete a project.
- owner is set automatically to the authenticated user on creation.

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

- Only the owner or an admin can update/delete a contact.
- owner is set automatically to the authenticated user on creation.

---

### Services (Courses/Reviews)

| Method | Route           | Description         | Auth | Body/Params | Response |
|--------|----------------|---------------------|------|-------------|----------|
| GET    | /services/     | List all services   | No   |             | [services]|
| GET    | /services/:id  | Get service by ID   | No   | :id         | service  |
| POST   | /services/     | Create service      | Yes  | fields      | service  |
| PUT    | /services/:id  | Update service      | Yes  | :id, fields | service  |
| DELETE | /services/:id  | Delete service      | Yes  | :id         | {msg}    |
| DELETE | /services/     | Delete all services | Yes  |             | {msg}    |

- Only the owner or an admin can update/delete a service.
- owner is set automatically to the authenticated user on creation.
- review is an optional field for course reviews.

---

## Special Business Logic & Constraints

- Passwords are hashed before storage.
- Email must be unique for users.
- JWT token required for all modifying operations (POST, PUT, DELETE) except user creation.
- Only authenticated users can create, update, or delete projects, contacts, and services.
- Only the resource owner or an admin can update/delete resources.
- Error responses use standard HTTP status codes and JSON error messages.
- Set isAdmin manually in the database for initial admin users.

---

Let the team know if you need more details on any endpoint, model, or flow!
