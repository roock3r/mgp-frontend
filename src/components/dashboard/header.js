import React from 'react';
import {ApolloConsumer} from "react-apollo";
import './dashboard.css'
import {Link, NavLink} from "react-router-dom";

const DashboardHeader = (props) => {
    const user = props.currentUser;

    const handleSignout = client => {
        localStorage.removeItem('authToken')
        client.writeData({data: {isLoggedIn : false}})
        console.log('Sign out user')
    }

    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">Matching Grants Program</Link>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#">Hi {user.email}</a>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        className="nav-link"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-1"
                                        className="nav-link "
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section One
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-2"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Two
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-3"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Three
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-4"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Four
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-5"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Five
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-6"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Six
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-7"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Seven
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-8"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Eight
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-9"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Nine
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/section-10"
                                        className="nav-link active"
                                        style={({ isActive }) =>
                                            (isActive ? {color: 'red'} : {color: 'blue'})}
                                    >
                                        Section Ten
                                    </NavLink>
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="file"></span>*/}
                                {/*        Orders*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="shopping-cart"></span>*/}
                                {/*        Products*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="users"></span>*/}
                                {/*        Customers*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="bar-chart-2"></span>*/}
                                {/*        Reports*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="layers"></span>*/}
                                {/*        Integrations*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                            </ul>

                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Other options</span>
                                <a className="link-secondary" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                            <ul className="nav flex-column mb-2">
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="file-text"></span>*/}
                                {/*        Current month*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="file-text"></span>*/}
                                {/*        Last quarter*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="file-text"></span>*/}
                                {/*        Social engagement*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#">*/}
                                {/*        <span data-feather="file-text"></span>*/}
                                {/*        Year-end sale*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                <ApolloConsumer>
                                    {client => (
                                        <li className="nav-item" onClick={() => handleSignout(client)}>
                                            <a className="nav-link" href="#">
                                                <span data-feather="file-text"></span>
                                                Sign out
                                            </a>
                                        </li>
                                    )}
                                </ApolloConsumer>
                            </ul>
                        </div>
                    </nav>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;