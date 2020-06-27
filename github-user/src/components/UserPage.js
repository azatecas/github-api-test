import React, { useEffect, useState } from 'react'
import { dummyInd } from './DummyData';
import UserCard from './UserCard';
import { connect } from 'react-redux';


const UserPage= ({userRepo, userInfo, isFetchingRepo}) => {

    console.log(dummyInd)

    return(
        <div>
            <h1>Welcome to user page</h1>
            { isFetchingRepo ? <h1>Loading</h1> : 
            <div>
            <h1>DONE</h1>
             <UserCard 
                img={userInfo.avatar_url}
                login={userInfo.login}
            />

            <div>
                {userRepo.map(repo => (
                    <div key={repo.id}>
                        {repo.full_name}
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