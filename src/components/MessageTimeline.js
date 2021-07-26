import React from "react"
import MessageList from "../containers/MessageList"
import UserAside from "./UserAside"

export default function MessageTimeline(props) {
    const { profileImageUrl, username } = props

    return (
        <div className="row">
            <UserAside
                profileImageUrl={profileImageUrl}
                username={username}
            />
            <MessageList />
        </div>
    )
}
