import React, { useState } from "react"

export default function AuthForm(props) {
    const {
        heading,
        buttonText,
        signup,
        onAuth,
        errors,
        removeError,
        history
    } = props
    //create state object for all values in the form
    const [state, setState] = useState({
        email: "",
        username: "",
        password: "",
        profileImageUrl: ""
    })

    function handleChange(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const authType = signup ? "signup" : "signin"
        onAuth(authType, state)
            .then(() => {
                history.push("/")
            })
            .catch((err) => {
                return
            })
    }
    //on route changes remove errors
    history.listen(() => {
        removeError()
    })

    return (
        <div>
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h2>{heading}</h2>
                        {/* if error message exists display it */}
                        {errors.message && (
                            <div className="alert alert-danger">{errors.message}</div>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={state.email}
                            type="text"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            type="password"
                        />
                        {/* if signup boolean true then add more inputs to the form */}
                        {signup &&
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    onChange={handleChange}
                                    value={state.username}
                                    type="text"
                                />
                                <label htmlFor="profileImageUrl">Image Url:</label>
                                <input
                                    className="form-control"
                                    id="profileImageUrl"
                                    name="profileImageUrl"
                                    onChange={handleChange}
                                    value={state.profileImageUrl}
                                    type="profileImageUrl"
                                />
                            </div>
                        }
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-lg">{buttonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}