import React from 'react';

export const UserCard = ({id, login, img}) => {

    return (
        <div key={id} className="user-card">
            <img src={img} alt={login} />
            <h3>{login}</h3>

        </div>
    )
}