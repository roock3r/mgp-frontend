import React, {useState} from 'react';
import './login.css'
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Error from "../shared/error";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit =  async(event, tokenAuth, client) => {
        event.preventDefault()
        const res = await tokenAuth();
        localStorage.setItem('authToken', res.data.tokenAuth.token)
        client.writeData({data: {isLoggedIn: true}})
    }

    return (
            <main className="text-center">
                <Mutation mutation={LOGIN_MUTATION} variables={{username, password}}  onCompleted={data => {
                    console.log(data)
                } }>
                    {(tokenAuth, {loading, error, called, client}) => {
                        return (
                            <form className="form-signin" onSubmit={event => handleSubmit(event,tokenAuth, client)} >
                            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                            <div className="form-floating">
                                <input type="username" className="form-control" id="floatingInput"
                                       placeholder="name@example.com" onChange={event => setUsername(event.target.value)}/>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword"
                                       placeholder="Password"  onChange={event => setPassword(event.target.value) }/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading || !username.trim() || !password.trim()}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                                {error && <Error error={error}/>}
                            <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                        </form>
                        )
                    }}
                </Mutation>
            </main>
            );
};

const LOGIN_MUTATION = gql`
mutation ($username: String!, $password: String!){
  tokenAuth(username:$username,password:$password ){
    token
  }
}
`

export default Login;