import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postNewMessage } from "../store/actions/messages"

function NewMessageForm(props) {
    const { postNewMessage, errors, history, removeError } = props
    const { isAuthenticated } = props.currentUser
    const [value, setValue] = useState("")

    function handleChange(e) {
        //set Value to event target
        setValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (isAuthenticated) {
            postNewMessage(value)
            setValue("")
            history.push("/")
        }
    }
    //on route changes remove errors
    history.listen(() => {
        removeError()
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors.message && (
                    <div className="alert alert-danger">{errors.message}</div>
                )}
                <div className="mb-3">
                    <label htmlFor="newmessage" className="form-label">New Message &nbsp;</label>
                    <textarea onChange={handleChange} value={value} className="form-control" id="newmessage" rows="3"></textarea>
                </div>
                <button className="btn btn-success">Create New Message</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { postNewMessage })(NewMessageForm)