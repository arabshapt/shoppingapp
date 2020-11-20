import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import UserProvider from "./userProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login";

const client = new ApolloClient({
  uri: "https://us-central1-shoppingapp-b232f.cloudfunctions.net/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

