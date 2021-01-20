# Node.js code assesment

🔥 This repo contains result of Node.js code assesment for recruitment process in Altran 🔥
<br/>
<br/>

## Getting started

<br/>

First, clone this repo

```
git clone https://github.com/rafwit/dare-nodejs-assesment.git
```

Second, navigate to repo's root folder and run

```
npm install
```

To start application navigate to repo's root folder and run

```
npm start
```

Next, create `.env` file in the root folder containing following information

```
SERVER_PORT=3000
CLIENT_ID=<CLIENT ID THAT YOU PROVIDED TO ME>
CLIENT_SECRET=<CLIENT SECRET THAT YOU PROVIDED TO ME>
AUTHENTICATION_ENDPOINT=<INSURANCE API LOGIN ENDPOING>
CLIENTS_ENDPOINT=<INSURANCE API CLIENTS ENDPOING>
POLICIES_ENDPOINT=<INSURANCE API POLICIES ENDPOING>
SECRET_KEY=VerySecureSecretKey
```

## Summary of work

- I have created REST API replicating all endpoints and their behaviour as explained in this [swagger.](https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/)

### ❗️ Decisions ❗️

#### Authentication and authorization

- ✅ Authentication: to be able to consume `GET` endpoints user first need to login by sending `POST` request to `/login`. As I was strictly instructed **not to use DB** I assumed dummy user authentication model:

  - I extract `username` from request, then my API consumes `INSURANCE API`, `POST` to `/login` and checks if the provided `username` exists.

    - if not: `400` error is send back
    - if yes:
      - save in in-memory cache `INSURANCE API` token received from `INSURANCE API` (user does not see it)
      - generate and send custom token for user (`USER TOKEN`)
      - both `INSURANCE API` and `user token` are stored for 560 seconds in cache, then deleted.

  - user after login to be able to consume `GET` endpoints needs to send authorization parameter with `USER TOKEN`, if it will expire new session needs to be generated by user.

- ✅ Authorization: I verify the `role` of the user in `INSURANCE API` `/clients` endpoint and assing role `user` or `admin`

### If I would have more time I would:

1. I would develop cache 🧳 after consuming `INSURANCE API` clients and policies. I encountered issues with using etag and I would need more time to develop proper solution
2. I would add more tests 🧪

#### Thank you and I will appreciate any feedback 🧠 ➡︎ 📈
