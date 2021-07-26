import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import Homepage from '../components/Homepage'
import { authUser, pingServer } from "../store/actions/auth"
import { removeError } from "../store/actions/error"
import NewMessageForm from './NewMessageForm'
//all routes for react router
const Main = props => {
    const { authUser, errors, removeError, currentUser } = props

    useEffect(() => {
        pingServer()
    }, [])

    return (
        <div className="container">
            <Switch>
                <Route exact path="/"
                    render={props =>
                        <Homepage
                            currentUser={currentUser}
                            {...props}
                        />}
                />
                <Route exact path="/users/:id/messages/new"
                    render={props =>
                        <NewMessageForm
                            removeError={removeError}
                            currentUser={currentUser}
                            {...props}
                        />}
                />
                <Route exact path="/signin"
                    render={props => (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Log in"
                            heading="Welcome back"
                            {...props}
                        />
                    )
                    } />
                <Route exact path="/signup"
                    render={props => (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            signup
                            buttonText="Sign Up"
                            heading="Join App today"
                            {...props}
                        />
                    )
                    } />
            </Switch>
        </div>
    )
}
//map currentUser and error from store
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}


export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main))