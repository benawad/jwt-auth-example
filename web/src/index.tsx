import React from "react";
import ReactDOM from "react-dom";
import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  from,
  ApolloProvider
} from "@apollo/client";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

// Setup the header for the request
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  const authorizationHeader = token ? `Bearer ${getAccessToken()}` : ``;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

//After the backend responds, we take the accessToken from headers if it exists, and save it in the memory.
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    if (headers) {
      const accessToken = headers.get("access-token");
      if (accessToken) {
        setAccessToken(accessToken);
      }
    }
    return response;
  });
});

const client = new ApolloClient({
  link: from([middlewareAuthLink, afterwareLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
