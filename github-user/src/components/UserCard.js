import React from 'react';
import gitImg from '../img/github.png';

const UserCard = ({img, login}) => {
    return (
        <div className="user-card" >
            <div className="card-bg1"/>
            <div className="card-bg2"/>
            <div className="card-info-cont">
                <img id="profile-img" src={img} alt={login} />
                <h3>{login}</h3> 
                <img id="logo" src={gitImg} alt="github" />
            </div>
        </div>
    )
}

export default UserCard;
