# Candor

This is an audio streaming mobile app that allows professionals to learn about company policies and updates in an easy-to-digest way.

The app works on both Android and iOS. The core technologies are React Native and Firebase (native SDK).

There are two apps contained in this repo. One is `CandorAPI`, which is the serverless backend and manages payments. The other app is `Candor` which is a React Native mobile app that uses Firebase for all the heavy lifting.

## Installation

To run this app, you'll need to deploy the backend and run `Candor` using the commands `npm start` and `npm run ios`.

## Development

This app is not currently set up to run locally.

## Deployment

The backend deploys with the `sls deploy` command. The main app does not yet deploy but can be run on a device by folling the procedures in the React Native documentation.

## Schema

```graphql
type User {
  fullName: String
  email: String
  employeeOf: Company
}

type Company {
  name: String
  administrators: {
    User: Boolean
    ...
  }
}

type Event {
  description: String # User X did this action
  code: String # create-account
  timestamp: DateTime
  actorId: User # The user responsible for the action
  companyId: Company # The company that the user is related to
}

type Content {
  title: String
  location: String # url of the content
}
```