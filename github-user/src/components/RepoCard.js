import React from 'react';
import gitImg from '../img/github.png';



const RepoCard = ({name, description, language, forks}) => {
    return(
        <>
            <div className="info-prop" id="card-logo">
                <img src={gitImg} alt="github" />
            </div>
            <div className="info-prop" id="card-detail">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className="info-prop" id="card-prop">
                <p>{language}</p>
                <p>Forks: {forks}</p>
            </div>  
        </>
    )
}

export default RepoCard;