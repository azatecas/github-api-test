import React from 'react';

export const UserCard = ({login, img, id}) => {

    return (
        <div className="user-card">
            <img src={img} alt={login} />
            <h3>{login}</h3>
            <h6>{id}</h6>

        </div>
    )
}