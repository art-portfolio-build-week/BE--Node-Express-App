# BE--Node-Express-App

This API allow users to register, access and upload image links for artists to showcase their work.

This back end was built with Node.js and Express. Originally developped with SQLite, the app was later ported to Heroku and the database converted from SQLite to PostgreSQL

The front end tapping into this API can be found at the following URL:
- https://artista-fe.netlify.app/

The back end is hosted in Heroku at the following URL:
- https://artista-backend.herokuapp.com/

# REST API

## POST: Register
- /api/register
### required:

- email (string)

- username (string)

- password (string)
### optional:

- dob (string) , format: MM/DD/YYYY

- title (string)

- uvp (string)
### returns:

- token

- user id

- username
### HEADERS
- Content-Type
  - application/json
- Authorization

### PARAMS
- BODY raw
  - {"username":"test1", "email":"test1@mail.com", "password":"xxxxxxxx", "dob":"01/01/1970", "phone": "1234567891", "uvp":"my uVP" }


### Example Request
- curl --location --request POST 'https://artista-backend.herokuapp.com/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{"username":"test1", "email":"test1@mail.com", "password":"xxxxxxx", "dob":"01/01/1970", "phone": "1234567891", "uvp":"my uVP" }'
### Example Response
- 201 － Created
- {
  "username": "test1",
  "id": 7,
  "token": "token information"
}

***
## POST: Login
- /api/login
### required fields:

- email (string)

- password (string)
### return value:

- token

- user id

- username
### HEADERS
- Content-Type
  - application/json
- Authorization
  - token information

### PARAMS
- BODY raw
  - {"email":"test1@mail.com", "password":"xxxxxxxx"}

### Example Request
- curl --location --request POST 'https://artista-backend.herokuapp.com/api/login' \
--header 'Content-Type: application/json' \
--header 'Authorization: token information' \
--data-raw '{"email":"test1@mail.com", "password":"xxxxxxxx"}'

### Example Response
- 200 － OK
- {
  "username": "test1",
  "id": 7,
  "token": "token information"
}
***
## GET: Get all posts

- /api/posts/

- return value: 
    - All existing posts

***
## GET: Get a Post by id
- /api/posts/15

- Require:
  - id in the URL

- return value:
  - post corresponding to that id

### Example Request
- curl --location --request GET 'https://artista-backend.herokuapp.com/api/posts/'

### Example Response
- 200 － OK
- [
  {
    "id": 1,
    "username_id": 1,
    "description": "user-centric benchmark initiatives",
    "title": "client-driven",
    "category": "transport",
    "timestamp": "2018-07-04T18:17:00+00:00",
    "imgURL": "http://lorempixel.com/640/480/transport/6",
    "votes": 2,
    "username": "Frances Bartell IV"
  },
  {
    "id": 2,
    "username_id": 4,
    "description": "efficient aggregate channels",
    "title": "client-server",
    "category": "fashion",
    "timestamp": "2017-04-12T20:58:20+00:00",
    "imgURL": "http://lorempixel.com/640/480/fashion/1",
    "votes": 0,
    "username": "Piper Hodkiewicz"
  }
  ]
***
## GET: Get a user by id with his/her related posts
- /api/users/1
### required fields:

- id in URL
### return values:

  - user profile

  - user postings
### HEADERS
- Authorization
  - token information

### Example Request
- curl --location --request GET 'https://artista-backend.herokuapp.com/api/users/1' \
--header 'Authorization: token information'
### Example Response
- 200 － OK
- {
  "user": {
    "id": 1,
    "username": "Frances Bartell IV",
    "email": "Korbin.Renner97@hotmail.com",
    "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "dob": "10/13/1964",
    "uvp": "enterprise leverage e-business",
    "phone": "14335896013"
  },
  "posts": [
    {
      "id": 12,
      "username_id": 1,
      "description": "B2B synthesize experiences",

***
## POST: upload new post
- /api/posts

### required : 
- token

### required fields:

- description(string)

- imgURL(string)

- title (string)

- category (string)

- timestamp (string)

- default values:
  - votes: 0
### return value:
- the new post

### HEADERS
- Content-Type
  - application/json
- Authorization
  - token

### PARAMS
- BODY raw
  - {"description": "final countdown", "imgURL":"http://lorempixel.com/640/480/e-commerce"}


### Example Request
  - curl --location --request POST 'https://artista-backend.herokuapp.com/api/posts?=' \
--header 'Content-Type: application/json' \
--header 'Authorization: token information' \
--data-raw '{"description": "first countdown", "imgURL":"http://lorempixel.com/640/480/e-commerce/1", "title":"title", "category":"e-commerce", "timestamp":"time" }'

### Example Response
- 201 － Created
- {
  "newPost": {
    "id": 38,
    "username_id": 7,
    "description": "first countdown",
    "title": "title",
    "category": "e-commerce",
    "timestamp": "time",
    "imgURL": "http://lorempixel.com/640/480/e-commerce/1",
    "votes": 0
  }
}
***

## PUT: Update a post
- /api/posts/37

### require: 
- token

- any or all of those 3 fields:

  - description (string)

  - imgURL (string)

  - title (string)

  - category (string)

  - timestamp (string)
### return value:

  - updated post

### HEADERS
- Content-Type
  - application/json
- Authorization
  - token information
### PARAMS
- BODY raw
  - {"description": "new descriptive flock","imgURL":"http://lorempixel.com/640/480/e-commerce/1", "votes":"99", "title":"title", "category":"e-commerce", "timestamp":"time" }


### Example Request
  - curl --location --request PUT 'https://artista-backend.herokuapp.com/api/posts/37' \
--header 'Content-Type: application/json' \
--header 'Authorization: token information' \
--data-raw '{"description": "new descriptive flock","imgURL":"http://lorempixel.com/640/480/e-commerce/1", "votes":"99", "title":"title", "category":"e-commerce", "timestamp":"time" }'

### Example Response
  - 200 － OK
  - {
  "id": 37,
  "username_id": 7,
  "description": "new descriptive flock",
  "title": "title",
  "category": "e-commerce",
  "timestamp": "time",
  "imgURL": "http://lorempixel.com/640/480/e-commerce/1",
  "votes": 99
}

***
## PUT: Update a vote
/api/posts/votes/1

### required: 
- token


### required field:

  - votes (string)

### return value:

  - new vote count
### HEADERS
- Content-Type
  - application/json
- Authorization
  - token information
### PARAMS
- BODY raw
  - {"votes": "2"}


### Example Request
  - curl --location --request PUT 'https://artista-backend.herokuapp.com/api/posts/votes/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: token information' \
--data-raw '{"votes": "2"}'
### Example Response
- 200 － OK
- {
  "newCount": 2
}

***
## DEL: Delete a post
- /api/posts/36

### required:
- token

### required field:

- id in URL
- Need to own the post

### return value: 
- message with count of deleted posts

### HEADERS
- Content-Type
  - application/json
- Authorization
  - token information

### Example Request
- curl --location --request DELETE 'https://artista-backend.herokuapp.com/api/posts/36' \
--header 'Content-Type: application/json' \
--header 'Authorization: token information' \
--data-raw ''
### Example Response
- 200 － OK
- {
  "message": "1 post(s) deleted"
}



***
