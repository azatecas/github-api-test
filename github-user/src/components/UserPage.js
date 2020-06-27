import React, { useEffect, useState } from 'react'
import { dummyInd } from './DummyData';
import UserCard from './UserCard';
import { connect } from 'react-redux';


const UserPage= ({userRepo, userInfo, isFetchingRepo}) => {

    console.log(dummyInd)

    return(
        <div className="app">
            { isFetchingRepo ? 
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
                : 
            <div>
             <UserCard 
                img={userInfo.avatar_url}
                login={userInfo.login}
            />

            <div className="repo-cont">
                {userRepo.map(repo => (
                    <div key={repo.id} className="repo-card">
                        <h3>{repo.name}</h3>
                        <p>{repo.description}</p>
                        <p>{repo.language}</p>
                        <p>{repo.forks}</p>
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