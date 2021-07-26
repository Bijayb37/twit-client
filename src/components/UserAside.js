import React from "react"
import defaultProfileImg from '../images/default-profile-image.jpg'

export default function UserAside({ username, profileImageUrl }) {

    return (
        <aside className="col-2 ">
            <div className="panel panel-default">
                <div className="panel-body">
                    <img
                        src={profileImageUrl || defaultProfileImg}
                        alt={username}
                        className="img-thumbnail"
                    />
                </div>
            </div>
        </aside>
    )
}