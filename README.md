# Be-talk

Clone the project

```bash
  https://github.com/alvinjamal/Be-talk.git
```

Go to the project directory

```bash
  cd be-talk
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
Start the server

```body
DB_USER=
DB_HOST=
DB_NAME=
DB_PASS=
DB_PORT=

JWT_KEY=
PORT=
HOST =

PHOTO_NAME=
PHOTO_KEY=
PHOTO_SECRET=

MAIL_USERNAME=
MAIL_PASSWORD=
OAUTH_CLIENTID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=
```

## API Reference

### Users

### Login

`http
  POST /users/login
`

### Body
```
{
"email": "alvinjamalazkya@gmail.com",
"password": "alvin123"
}
```

#### Register
```
http
  POST /users/register
```

### Body

```body
{
"name_user": "Alvin Jamal Azkya"
"email": "alvinjamalazkya@gmail.com",
"password": "alvin123",
}
```

### Verification

```http
  POST /users/verif
```

### Body

```body
{
    "email":"alvinjamalazkya@gmail.com",
    "otp":"096624"
}
```
### Forgot

```http
  POST /users/forgot
```

### Body

```body
{
    "email":"alvinjamalazkya@gmail.com",
}
### Forgot

```http
  POST /users/forgot/:token
```

### Body

```body
{
    "email":"alvinjamalazkya@gmail.com",
    "Password":"jamal123"
}
```

#### Profile

```http
  GET /users/detail
````

#### Body

```body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_user": "9d643d80-befa-4ed4-a483-f035e3327e0c",
            "email": "alvinjamalazkya@gmail.com",
            "name_user": "Azkya",
            "password": "$2a$10$eCVQWa/JXB8gmAJUSxsC7u43PrHZcS3mL3nNlT37m3fPpB8LVSOR.",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1675482787/chat/ehqiogdnxyhkovhtbwdz.jpg",
            "verif": 1,
            "phone": "08524411"
            "username": "VinAzkya",
            "bio": "Programmer Sejati",
            "otp": "330012",
        }
    ],
    "message": "Get Detail Success"
}
```

#### Update Profile

```http
  PUT /users/update
```

#### Body

```body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "username": "VinAzkya",
        "bio": "Programmer Sejati",
        "phone": "08524411",
        "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1675482787/chat/ehqiogdnxyhkovhtbwdz.jpg"
    },
    "message": "Update Profile Success"
}
```

#### All User

```http
  GET /users/all
```

#### Body

```body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_user": "600eabbd-e468-4ddb-a762-67e73c7260d7",
            "name_user": "Azkya",
            "email": "alvin.jamalazkya@gmail.com",
            "password": "$2a$10$EHbH2k0Cv3rFUP/ZZAr3B.oiPYtybHRMzx2/gwaeutoVr3v.h9we.",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1675482787/chat/ehqiogdnxyhkovhtbwdz.jpg",
            "username": "VinAzkya",
            "bio": "Programmer Sejati",
            "phone": "08524411",
            "verif": "1",
            "otp": "330012"
        },
        {
            "id_user": "a86fe788-6ea5-4cc3-9116-1e6812c46bd9",
            "name_user": "Alvin Jamal Azkya",
            "email": "alvinjamalazkya@gmail.com",
            "password": "$2a$10$pAChTw66M2xFsupHWfV60epvxUS3cRjj8HZpK1aqLvg0uPjvPdjDS",
            "photo": "http://res.cloudinary.com/diunwoak6/image/upload/v1675500904/chat/zstpxts5pecsbigysevx.jpg",
            "username": "Vinn",
            "bio": "Fullstack Developer",
            "phone": "81223861041",
            "verif": "1",
            "otp": "096624"
        }
    ],
    "message": "Get User Success"
}
```
