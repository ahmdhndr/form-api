# Form API

## Description

API for Form app like Google Form. Created using `Node.js` with `Express.js` as a node.js framework and `MongoDB` for the database. This project is the result of my learning on [Wegodev](https://wegodev.com/) site in the [Back-End NodeJS - Wegodev Form](https://wegodev.com/courses/back-end-wegodevform) class.

## Installation

#### Metode 1: Download ZIP

#### Metode 2: Clone the repository

```bash
git clone https://github.com/eruDev0/form-api.git
cd form-api
npm install
```

> Setup before running this project

1. Create an .env file inside your root project directory

```bash
.env
# HTTP SERVER
PORT=
# MONGODB
MONGO_URI=
# TOKEN
ACCESS_TOKEN_KEY=
ACCESS_TOKEN_AGE=
REFRESH_TOKEN_KEY=
REFRESH_TOKEN_AGE=
```

2. Run your project

```bash
npm run start:dev
```

## Form API Documentation

### Endpoint

For now, still using local endpoint. It should run on `http://localhost:3000/api` or depending on your defined/available port.

#### User

**Register**

- URL
  - `/register`
- Method
  - `POST`
- Request Body
  - `fullname as string`
  - `email as string, must be unique`
  - `password as string, must be at least 6 characters`
- Response
  ```json
  {
    "status": "success",
    "data": {
      "addedUser": {
        "_id": "63aa8f1f7523e0698a524c58",
        "fullname": "John Doe",
        "email": "johndoe@test.com"
      }
    }
  }
  ```

**Login**

- URL
  - `/login`
- Method
  - `POST`
- Request Body
  - `email as string`
  - `password as string`
- Response
  ```json
  {
    "status": "success",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWE4ZjFmNzUyM2UwNjk4YTUyNGM1OCIsImVtYWlsIjoiam9obmRvZUB0ZXN0LmNvbSIsImZ1bGxuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzIxMjIyNTcsImV4cCI6MTY3MjIwODY1N30.DXmB8Ea3GgP5W-CffhNYtHtawpvYXyjSI7dUYTFCXbo",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWE4ZjFmNzUyM2UwNjk4YTUyNGM1OCIsImVtYWlsIjoiam9obmRvZUB0ZXN0LmNvbSIsImZ1bGxuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzIxMjIyNTcsImV4cCI6MTY3MjcyNzA1N30.USE9nmI-wxu1mz027F7aMJMVqMMzXBqp9C6NIAY6KzA"
    }
  }
  ```

**Get user profile**

- URL
  - `/profile`
- Method
  - `GET`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "63aa8f1f7523e0698a524c58",
        "fullname": "John Doe",
        "email": "johndoe@test.com"
      }
    }
  }
  ```

#### Forms

**Create Form**

- URL
  - `/forms`
- Method
  - `POST`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `title as string, default: 'Untitled form'`
  - `description as string, default: 'Form description'`
- Response
  ```json
  {
    "status": "success",
    "message": "FORM_CREATED",
    "data": {
      "newForm": {
        "owner": "63aa8f1f7523e0698a524c58",
        "title": "Untitled form",
        "description": "Form description",
        "questions": [
          {
            "id": "63aaf67e474be0de73ea2e86",
            "qnValue": "Untitled question",
            "type": "text",
            "required": false,
            "options": []
          }
        ],
        "invites": [],
        "public": true,
        "_id": "63aa910d5118458955195604",
        "createdAt": 1672122637,
        "updatedAt": 1672122637,
        "__v": 0
      }
    }
  }
  ```

**Get Forms**

- URL
  - `/forms`
- Method
  - `GET`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response
  ```json
  {
    "status": "success",
    "data": {
      "forms": {
        "items": [
          {
            "_id": "63aa910d5118458955195604",
            "owner": "63aa8f1f7523e0698a524c58",
            "title": "Untitled form",
            "description": "Form description",
            "questions": [
              {
                "id": "63aaf67e474be0de73ea2e86",
                "qnValue": "Untitled question",
                "type": "text",
                "required": false,
                "options": []
              }
            ],
            "invites": [],
            "public": true,
            "createdAt": 1672122637,
            "updatedAt": 1672122637,
            "__v": 0
          }
        ],
        "itemCount": 1,
        "perPage": 10,
        "pageCount": 1,
        "currentPage": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prev": null,
        "next": null
      }
    }
  }
  ```
  > The above structure occurs because of the return from `Form.paginate({ owner }, options)` in the `FormController` file to the **`getForms`** function to be exact. If you want the response returned to be structured like `data: { forms: [...] }`, you can change from `Form.paginate` to `Form.find({ owner })`.

**Get Single Form**

- URL
  - `/forms/:formId`
- Method
  - `GET`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response
  ```json
  {
    "status": "success",
    "data": {
      "form": {
        "_id": "63aa910d5118458955195604",
        "owner": "63aa8f1f7523e0698a524c58",
        "title": "Untitled form",
        "description": "Form description",
        "questions": [
          {
            "id": "63aaf67e474be0de73ea2e86",
            "qnValue": "Untitled question",
            "type": "text",
            "required": false,
            "options": []
          }
        ],
        "invites": [],
        "public": true,
        "createdAt": 1672122637,
        "updatedAt": 1672122637,
        "__v": 0
      }
    }
  }
  ```

**Update Form By ID**

- URL
  - `/forms/:formId`
- Method
  - `PUT`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `title as string`
  - `description as string`
- Response
  ```json
  {
    "status": "success",
    "message": "FORM_UPDATED",
    "data": {
      "form": {
        "_id": "63aa910d5118458955195604",
        "owner": "63aa8f1f7523e0698a524c58",
        "title": "Form title updated",
        "description": "Form description updated",
        "questions": [
          {
            "id": "63aaf67e474be0de73ea2e86",
            "qnValue": "Untitled question",
            "type": "text",
            "required": false,
            "options": []
          }
        ],
        "invites": [],
        "public": true,
        "createdAt": 1672122637,
        "updatedAt": 1672133346,
        "__v": 0
      }
    }
  }
  ```

**Delete Form By ID**

- URL
  - `/forms/:formId`
- Method
  - `DELETE`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response
  ```json
  {
    "status": "success",
    "message": "FORM_DELETED"
  }
  ```

**View Form By Invited User**

- URL
  - `/forms/:formId/viewForm`
- Method
  - `GET`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response
  ```json
  {
    "status": "success",
    "data": {
      "form": {
        "_id": "63aac0a12b9ca16a9cf4edcb",
        "owner": "63aa8f1f7523e0698a524c58",
        "title": "Form title updated",
        "description": "Form description updated",
        "questions": [
          {
            "id": "63aaf67e474be0de73ea2e86",
            "qnValue": "Untitled question",
            "type": "text",
            "required": false,
            "options": []
          }
        ],
        "public": true,
        "createdAt": 1672122637,
        "updatedAt": 1672133534
      }
    }
  }
  ```

#### Questions

**Add Question**

- URL
  - `/forms/:formId/questions`
- Method
  - `POST`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `qnValue as string, default 'Untitled question'`
  - `type as string, default 'text'`
  - `required as boolean, default false`
- Response
  ```json
  {
    "status": "success",
    "message": "QUESTION_ADDED",
    "data": {
      "addedQuestion": {
        "id": "63ae43df86d51667239b67bc",
        "qnValue": "New question",
        "type": "email",
        "required": false,
        "options": []
      }
    }
  }
  ```

**Update Question**

- URL
  - `/forms/:formId/questions/{questionId}`
- Method
  - `PUT`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body `<one properties at every request>`
  - `qnValue as string, or`
  - `type as string, or`
  - `required as boolean`
- Response
  ```json
  {
    "status": "success",
    "message": "QUESTION_UPDATED",
    "data": {
      "updatedQuestion": {
        "id": "63ae43df86d51667239b67bc",
        "qnValue": "Example question updated",
        "type": "email",
        "required": false,
        "options": []
      }
    }
  }
  ```

**Delete Question**

- URL
  - `/forms/:formId/questions/{questionId}`
- Method
  - `DELETE`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response
  ```json
  {
    "status": "success",
    "message": "QUESTION_DELETED"
  }
  ```

#### Options

**Add Option**

- URL
  - `/forms/:formId/questions/{questionId}/options`
- Method
  - `POST`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `optValue as string`
- Response

```json
{
  "status": "success",
  "message": "OPTION_ADDED",
  "data": {
    "addedOption": {
      "id": "63ae47a5d78da8766ab04f59",
      "value": "JavaScript"
    }
  }
}
```

**Update Option**

- URL
  - `/forms/:formId/questions/{questionId}/options`
- Method
  - `PUT`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `optValue as string`
- Response

```json
{
  "status": "success",
  "message": "OPTION_UPDATED",
  "data": {
    "updatedOption": {
      "id": "63ae47a5d78da8766ab04f59",
      "value": "React JS"
    }
  }
}
```

**Delete Option**

- URL
  - `/forms/:formId/questions/{questionId}/options`
- Method
  - `DELETE`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `optValue as string`
- Response

```json
{
  "status": "success",
  "message": "OPTION_DELETED"
}
```

#### Answers

**Add Answer**

- URL
  - `/answers/:formId/`
- Method
  - `POST`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `answers as array of object with questionId and value as property`
  - > example answer for single value: `answers: [ { "questionId": "123", value: "some value" } ]`
  - > example answer for multiple value like checkbox: `answers: [ { "questionId": "123", value: ["value 1", "value 2"] } ]`
- Response
  ```json
  {
    "status": "success",
    "message": "ANSWER_ADDED",
    "data": {
      "addedAnswer": {
        "owner": "63aa8f1f7523e0698a524c58",
        "formId": "63aaf67e474be0de73ea2e87",
        "_id": "63ae53cd3c0a6f82adc1786c",
        "63aaf67e474be0de73ea2e86": ["React JS", "Vue JS"],
        "createdAt": 1672369101,
        "updatedAt": 1672369101,
        "__v": 0
      }
    }
  }
  ```

#### Invites

**Invite a User**

- URL
  - `/forms/:formId/invites`
- Method
  - `POST`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `email as string`
- Response

```json
{
  "status": "success",
  "message": "EMAIL_INVITED",
  "data": {
    "invitedEmail": "eruhendar@test.com"
  }
}
```

**Delete Invited User**

- URL
  - `/forms/:formId/invites`
- Method
  - `DELETE`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Request Body
  - `email as string`
- Response

```json
{
  "status": "success",
  "message": "EMAIL_DELETED",
  "data": {
    "deletedEmail": "eruhendar@test.com"
  }
}
```

**Get Invited User List**

- URL
  - `/forms/:formId/invites`
- Method
  - `GET`
- Headers:
  - `Authorization: Bearer <accessToken>`
- Response

```json
{
  "status": "success",
  "message": "INVITED_EMAIL",
  "data": {
    "invites": ["eruhendar@test.com", "ulfa@test.com"]
  }
}
```
