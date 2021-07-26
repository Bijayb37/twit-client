import React, { useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import defaultProfileImg from '../images/default-profile-image.jpg'
import Toggler from '../hooks/Toggler'

const MessageItem = (props) => {
    const {
        update,
        date,
        profileImgUrl,
        text,
        username,
        deleteMessage,
        messageId,
        userId,
        isCorrectUser,
        likes,
        edit
    } = props

    const [editing, toggle] = Toggler(false)
    const [hover, hoverToggle] = Toggler(false)
    const [newText, setNewText] = useState(text)

    function editText(e) {
        e.preventDefault()
        edit(userId, messageId, newText)
        toggle()
    }

    return (
        <li className="list-group-item">
            <img src={profileImgUrl || defaultProfileImg} alt={username} className="timeline-image col-2 col-md-1" />
            <div className="message-area">
                <div className="itemHeader">
                    <Link to="/">@{username} &nbsp;</Link>
                    <span className="text-muted">
                        <Moment className="text-muted" format="Do MMM YYYY">
                            {date}
                        </Moment>
                        <span className="heart">
                            <i
                                className={hover ? "bi bi-heart-fill" : "bi bi-heart"}
                                onClick={() => update(userId, messageId, likes, +1)}
                                onMouseEnter={hoverToggle}
                                onMouseLeave={hoverToggle}
                            ></i>
                            &nbsp; {likes} &nbsp;
                        </span>
                        {isCorrectUser && (
                            <span>
                                <i className="bi bi-three-dots" data-bs-toggle="dropdown"></i>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={toggle} className="dropdown-item" >Edit Message</li>
                                    <li onClick={() => deleteMessage(userId, messageId)} className="dropdown-item" href="#">Delete Message</li>
                                </ul>
                            </span>
                        )}
                    </span>
                </div>

                {/* if editing show form, for new text */}
                {editing
                    ? <form onSubmit={editText} className="edit-form">
                        <input value={newText} onChange={(e) => setNewText(e.target.value)} className="form-control" type="text" name="new-text" id="new-text" />
                        <button className="edit-btn btn btn-outline-info">click me</button>
                    </form>
                    : <p className="text-break col-12">{text}</p>
                }
            </div>
        </li>
    )
}

export default MessageItem