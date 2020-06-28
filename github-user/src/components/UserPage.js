import React, { useEffect, useState } from 'react'
import { dummyInd } from './DummyData';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import gitImg from '../img/github.png';


const UserPage= ({userRepo, userInfo, isFetchingRepo}) => {

    const githubProfile = (url) => {
        window.open(url, '_blank');
    }

    const githubRepo = (url) => {
        window.open(url, '_blank');
    }

    return(
        <div className="app">
            { isFetchingRepo ? 
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
                : 
            <div className="user-page-cont">
                <div className="user-stat-cont">
                    <div onClick={()=>{githubProfile(userInfo.html_url)}}>
                        <UserCard 
                            img={userInfo.avatar_url}
                            login={userInfo.login}
                        />
                    </div>
                    <div className="user-info">
                        <div>
                            <h6>Name:</h6>
                            <p>{userInfo.name}</p>
                        </div>
                        <div>
                            <h6>Location:</h6>
                            <p>{userInfo.location}</p>
                        </div>
                        <div>
                            <h6>Followers:</h6>
                            <p>{userInfo.followers}</p>
                        </div>
                        <div>
                            <h6>Following:</h6>
                            <p>{userInfo.following}</p>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
             

            <div className="repo-cont">
                {userRepo.map(repo => (
                    <div key={repo.id} className="repo-card" onClick={()=>{githubRepo(repo.html_url)}}>
                        <div className="info-prop" id="card-logo">
                            <img src={gitImg} alt="github" />
                        </div>
                        <div className="info-prop" id="card-detail">
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                        </div>
                        <div className="info-prop" id="card-prop">
                            <p>{repo.language}</p>
                            <p>Forks: {repo.forks}</p>
                        </div>                        
                    </div>
                ))}
            </div> 
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userRepo: state.userRepo,
        userInfo: state.userInfo,
        isFetchingRepo: state.isFetchingRepo
    }
}

export default connect(
    mapStateToProps,
    {}
)(UserPage);