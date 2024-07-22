import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query} from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost'
import Auth from './components/auth/auth';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from "./components/frontend/main";

const client = new ApolloClient(
    {
        uri: 'https://mgp.silvatech.bz/graphql/',
        fetchOptions: {
            credentials: "include"
        },
        request: operation => {
            const token = localStorage.getItem('authToken') || ""
            operation.setContext({
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
        },
        clientState: {
            defaults: {
                isLoggedIn: !!localStorage.getItem('authToken')
            }
        }
    }
)

const IS_LOGGED_IN_QUERY = gql`
 query{
    isLoggedIn @client
 }
`

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Query  query={IS_LOGGED_IN_QUERY}>
                {({data}) => data.isLoggedIn ? <App/> : <Auth/>}
            </Query>
        </ApolloProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
