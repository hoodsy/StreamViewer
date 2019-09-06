# StreamViewer

**Watch and chat with Youtube Gaming's most popular communiites.**

Demo: [https://streamviewer-ui.herokuapp.com](https://streamviewer-ui.herokuapp.com)

Prisma Data Viewer: [https://app.prisma.io](https://app.prisma.io) - invitation sent to murti@streamlabs.com

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
