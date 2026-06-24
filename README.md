# Books API - RESTful CRUD Operations

A fully functional RESTful API for managing books and authors with MongoDB, built using Express.js, Mongoose ODM, and following the MVC architectural pattern.

## Project Structure

```
├── config/
│   └── db.js                    # Database connection pool initializer
├── controllers/
│   ├── authorsController.js     # Handles author HTTP requests/responses
│   └── booksController.js       # Handles book HTTP requests/responses
├── models/
│   ├── authorsModel.js          # Author MongoDB operations/queries
│   └── booksModel.js            # Book MongoDB operations/queries
├── routes/
│   ├── authorsRoutes.js         # Author API routes
│   └── booksRoutes.js           # Book API routes
├── app.js                       # Application entrypoint (Wires dependencies & boots server)
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 7.x (Object Data Modeling)
- **Module System**: ES Modules (ESM)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure MongoDB Atlas connection string is set in `app.js`:
```javascript
const uri = 'mongodb+srv://username:password@cluster.mongodb.net/?authSource=admin';
```

3. The app uses Mongoose for schema validation and database operations. Schemas are defined in the models directory.

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Create a Book
**Status Code**: `201 Created`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1925
}
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1925,
  "createdAt": "2026-06-18T10:30:00.000Z"
}
```

**Notes**:
- `title` and `author` are required fields
- `isbn` and `publishedYear` are optionalcreatedAt": "2026-06-18T10:30:00.000Z"
}
```All Books
**GET** `/books`

**Status Code**: `200 OK`

**Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0743273565",
    "publishedYear": 1925,
    "createdAt": "2026-06-18T10:30:00.000Z"
  }
]
```

### 3. Get a Book by ID
**GET** `/books/:id`


**Au4. Update a Book (Partial Update)
**PATCH** `/books/:id`

**Status Code**: `200 OK`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body** (partial update):
```json
{
  "publishedYear": 1926
}
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1926,
  "createdAt": "2026-06-18T10:30:00.000Z"
}
```

### 5. Delete a Book
**DELETE** `/books/:id`

**Status Code**: `204 No Content`

**Example Request**:
```
DELETE http://localhost:3000/books/507f1f77bcf86cd799439011
```

**Response**: Empty body with status code 204

## Authors Endpoints

The API includes similar CRUD endpoints for authors at `/authors`:
- `POST /authors` - Create an author
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get specific author
- `PATCH /authors/:id` - Update an author
- `DELETE /authors/:id` - Delete an author

**Author fields**:
- `name` (required)
- `birthYear` (optional)
- `nthentication**: Required (Admin key in header)
**Status Code**: `204 No Content`

**Request Headers**:
```
x-admin-key: admin-secret-key
```

**Example Request**:
```
DELETE http://localhost:3000/books/507f1f77bcf86cd799439011
```

**Response**: Empty body with status code 204

## Error Responses

### Unauthorized (401)
Missing or invalid admin key:
```json
{
  "error": "Unauthorized: Admin key required"
}
```

### Bad Request (400)
Missing required fields:
```json
{
  "error": "Title and author are required"
}
```

### Not Found (404)
BookMongoose Schemas
Mongoose provides schema validation and automatic type casting:
```javascript
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, default: null },
  publishedYear: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
});
```

### MVC Architecture
- **Model**: Handles data operations with Mongoose (defined in `/models`)
- **View**: JSON responses sent to the client
- **Controller**: Routes requests to the model and formats responses (in `/controllers`)
- **Routes**: URL routing with Express (in `/routes`)

### ES Modules
The project uses modern JavaScript ES Module syntax for all imports and exports:
```javascript
import express from 'express';
import mongoose from 'mongoose
## Design Patterns

### Dependency Injection
The `BookModel` class accepts the database connection as a constructor argument:
```javascript
const bookModel = new BookModel(db);
```

### MVC Architecture
- **Model**: Handles data operations with MongoDB
- **View**: JSON responses sent to the client
- **Controller**: Routes requests to the model and formats responses

### ES Modules
The project uses modern JavaScript ES Module syntax for all imports and exports:
**Create a book:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"1984\",\"author\":\"George Orwell\",\"publishedYear\":1949}"
```

**Get all books:**
```bash
curl http://localhost:3000/books
```

**Get a specific book:**
```bash
curl http://localhost:3000/books/507f1f77bcf86cd799439011
```

**Update a book:**
```bash
curl -X PATCH http://localhost:3000/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d "{\"publishedYear\":1950}"
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:3000/books/507f1f77bcf86cd799439011
```

## Testing with PowerShell

```powershell
# Create a book
$newBook = @{
    title = "1984"
    author = "George Orwell"
    publishedYear = 1949
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/books" -Method POST -ContentType "application/json" -Body $newBook
$bookId = ($response.Content | ConvertFrom-Json)._id

# Get all books
Invoke-WebRequest -Uri "http://localhost:3000/books" | Select-Object -ExpandProperty Content

# Update book
$updateData = @{ publishedYear = 1950 } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/books/$bookId" -Method PATCH -ContentType "application/json" -Body $updateData
```

## Health Check

Check if the API is running:
```bash
curl http://localhost:3000/health
```

Response: `{"status":"API is running"}`

## Notes

- Mongoose provides automatic schema validation for all documents
- All timestamps are stored in UTC format
- Partial updates are supported through the PATCH endpoint
- The app requires a valid MongoDB Atlas connection string
- For production, implement proper authentication (OAuth2, JWT, etc.)
- Mongoose automatically converts strings to ObjectIds for `_id` fields
## Notes

- The authentication uses a simple header-based key (`x-admin-key: admin-secret-key`). For production, implement OAuth2, JWT, or similar security protocols.
- All timestamps are stored in UTC format.
- The API validates MongoDB ObjectIds before querying the database.
- Partial updates are supported through the PATCH endpoint, allowing modification of specific fields without affecting others.
"# Node.js-using-MongoDB" 
"# REST-Mongoose" 
