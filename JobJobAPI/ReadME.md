# JobJob App API

## Backend server for the JobJob App, with auth and mongoose relationships

## Entities

```js
// User is comprised of the following
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  token: String,


```

```js
// Job App is comprised of the following
  //job title
  title: {
    type: String,
    required: true,
  },
  //company name
  cName: {
    type: String,
  },
  //Application Date
  aDate: {
    type: Date,
  },
  //application Status
  aStatus: {
    //true false on whether you've applied or not
    type: Boolean,
  },
  interview: {
    // did you get an interview?
    type: Boolean,
  }

```

```js
// Interview is comprised of the following
  //type of interview
  intType: {
    type: String,
    enum: ['behavioral', 'technical', 'extra']
    required: true,
  },
  timeStamps: {
    type: Date,
  },
  contacts: {
    type: String,
  },
  Notes: {
    type: String,
  }

```
## Routes

### Auth Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Applications Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/applications`             | `applications#index`    |
| GET   | `/applications/:id`             | `applications#show`    |
| POST   | `/applications`             | `applications#create`    |
| PATCH  | `/application/:id` | `applications#update`  |
| DELETE | `/applications/:id`        | `applications#delete`   |

###  Interview Routes
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/interviews/:applicationId`         | `interviews#create`    |
| PATCH  | `/interviews/:applicationId/:interviewId`  | `interviews#update`  |
| DELETE | `/interviews/:applicationId/:interviewId`  | `interviews#delete`   |