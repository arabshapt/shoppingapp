
# Getting Started with Shopping App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### `Here is a live demo:`  [link to shopping app](https://shoppingapp.cf/)

### `Docker`

```docker-compose up``` or ```docker-compose up -d``` to run it in the background
stop it with ```docker-compose down```

## Available Scripts

In the project directory, you can run:

### `yarn`

Installs all the necessary packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `.env`
Register an application on firebase and enter config data from firebase in .env file.
Deploy shoppingappbackend to firebase and get url that needs to be added to .env in frontend's last row
REACT_APP_FIREBASE_GRAPHQL_URL=
