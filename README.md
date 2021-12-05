# SpotMe
SpotMe is an application where users can find friends, spot them cosh (or request a spot) as well as deposit and withdraw funds from their user accounts utilizing a Stripe API augmented backend.

[Check it out on Heroku](https://spot-me-application.herokuapp.com/)

## Contents
[Architectural Requirements](architectural-requirements)

## Installation Instructions
1. Clone the repository
2. Using PostgreSQL, create a user with a strong password and `CREATEDB` privileges
3. `cd` into the `backend/` directory and run `npm install`
4. Create a `.env` file based off the `.env.example` file, replacing all the necessary data
5. Run the command `npx dotenv sequlize db:create` to create the database
6. Run the command `npm run reset-db && npm start`to migrate, seed, and start the server
7. `cd` into the `frontend/` directory and run `npm install`
8. Run `npm start` to start the React app

## Architectural Overview

### Architectural Pattern
SpotMe utilizes an MVC architectural pattern. The three components (Model, View, and Controller) are represented as follows:
1. `Model`: The backend PostgreSQL in conjunction with the Redux state represent the model. All the pertinent data to render in the application is stored here.
2. `View`: The frontend React app is the View layer of the MVC architectural pattern. The user is provided with an interface reflective of the data stored in the model (database and Redux state) and can interact with the site, triggering the controller to manipulate the model
3. `Controller`: The Redux reducers and hooks such as useDispatch and useSelector function as the controller in this paradigm. The user input form the View layer triggers the controller (reducer) into alterig the model, and also serves as the method to relay state updates to be dynamically rendered in the View.

### Data Architecture
See [Database Schema](https://github.com/monemad/spot-me/wiki/Database-Schema)

### Component Architecture

```js
<Root />                    // Container for the entire application
    <Navigation />          // Persistent navbar visible on all routes
    <Routes />              // Route Handler for front end, serving different components at each route
        <Home />            // Home component containing links to other major components
        <Friends />         // Friends component renders confirmed and pending friends
        <History />         // History component renders history of spots and transfers
        <PendingSpots />    // PendingSpots comonent renders list of all unfulfilled spots related to logged in user
```

## Application Flow

### Home Page
![Home Page](https://imgur.com/Q3QRY7G.png)

All of the buttons/links are presented here in an easy to read and interact layout. The user is presented with their available balance as well as all the available actions.

---
## Transfer Funds
![Transfer Funds Form](https://imgur.com/0PeeGPM.png)
The user can deposit funds into their account (virtual funds, but the funds are added to the application's Stripe account thr the API). Users can also withdraw any amount of their available balance.

---
## Friends
![Friends Confirmed](https://imgur.com/ikiWipq.png)
![Friends Received](https://imgur.com/8JrzEBK.png)

Users can see all of thier friends (confirmed, sent requests, and received requests). Users can cancel sent requests, or confirm received requests.

---
## Send/Request a Spot
![Spot Form](https://imgur.com/QbNJC10.png)

Users can sendor request money from any of their confirmed friends.

---
## Search
![Search](https://imgur.com/t4uYpKt.png)

Users can search for other users to add as friends. The filtering is done thru a backend query to limit the runtime/performance impact of a front-end search/filtering system.

---
<br></br>
## Architectural requirements
- [x] Use a modern JS Library/Framework (React.js)
- [x] Application must be interactible by users in a minimum of 3 ways
    - Add friends
    - Search for friends
    - View history
    - Send/Request a spot
    - Deposit/Withdraw funds
- [x] Usage of a specified architectural pattern (MVC)
- [x] Integration with a backend service (Express/Sequelize, PostgraSQL) 
- [x] Integration with a 3rd party RESTful API (Stripe?)
- [x] Usage of at least 5 UI components from material-ui/@core
    - Button
    - List
    - Avatar
    - Tabs
    - Snackbar
- [x] A reusable compenent that I have created and used in the app (CustomModal)
