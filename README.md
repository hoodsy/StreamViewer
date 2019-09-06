# StreamViewer

**Watch and chat with Youtube Gaming's most popular communiites.**

Demo: LINK TO DEMO

Github: LINK TO GITHUB

Prisma Data Viewer: LINK TO PRISMA

## Overview

With StreamViewer you are able to:

1. Login with your Google account
2. View the 6 most popular YouTube Gaming streams
3. Chat with any of these 6 streams
4. View all of your messages in the application's database via Prisma

StreamViewer is a full-stack Javascript application using the following tools and frameworks:

**UI**

- React
- Apollo (GraphQL client)
- Styled Components
- React Router
- YouTube API
- Google OAuth

**Server**

- Node
- GraphQL Yoga (express-like graphql server)
  - Schema located in `/server/schema.graphql`
- Prisma (GraphQL database client)
- MySQL (abstracted by Prisma)
  - "Model" abstractions located in `/server/datamodel.prisma`

## Todo

_in progress work that I was unable to complete in the provided 8 hours_

- [ ] Google Auth on server side
- [ ] YouTube API data served from server
- [ ] Chat messages properly formatted with sender, time sent, etc
- [ ] General look and feel

## Youtube API

- search query

  - topicID = /m/0bzvm2 (gaming)
  - api key = AIzaSyCsO3F90ANpftL2H7ZXoegisbPxOcjgcS4

- OAuth
  - client id = 195618579351-r3nea8vqavpf6he1nge6277rbca4tb17.apps.googleusercontent.com
  - client secret = \_mjxCvxilZGpbS9n5y8HLXvI
