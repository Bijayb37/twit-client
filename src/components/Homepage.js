import React from "react"
import { Link } from "react-router-dom"
import MessageTimeline from "./MessageTimeline"

const Homepage = props => {
    const { currentUser } = props
    // show link to sign up if user isnt authenticated
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>Whats new in the world</h1>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
        )
    }
    return (
        <div >
            <MessageTimeline  {...currentUser} />
        </div>
    )

}

export default Homepage