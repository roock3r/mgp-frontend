import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query} from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost'
import Auth from './components/auth/auth';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

const client = new ApolloClient(
    {
        uri: 'http://django-mpg-backend-env.eba-p2p7kjna.us-east-2.elasticbeanstalk.com/graphql/',
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
