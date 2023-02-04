# Be-talk

Clone the project

```bash
  https://github.com/alvinjamal/Be-talk.git
```

Go to the project directory

```bash
  cd Backend-Telegram
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

``http
  POST /users/login
``
### Body
{
    "email": "alvinjamalazkya@gmail.com",
    "password": "alvin123"
}
``

#### Register

``http
  POST /users/register
``

### Body

``body
{
    "name_user": "Alvin Jamal Azkya"
    "email": "alvinjamalazkya@gmail.com",
    "passwordr": "ridhwan123",
}
```

### Verification

``http
  POST /users/verif
``

### Body

``body
{
    "email_user":"ridhwanzaki177@gmail.com",
    "otp":"862454"
}
``
