import React, { useEffect, useState } from 'react'
import { dummyInd } from './DummyData';
import UserCard from './UserCard';
import { connect } from 'react-redux';
// import gitImg from '../img/github.png';
import RepoCard from './RepoCard';


const UserPage= ({userRepo, userInfo, isFetchingRepo, userFollowers}) => {

    const [toggle, setToggle] = useState(false);

    const extLink = (url) => {
        window.open(url, '_blank');
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return(
        <div className="app">
            { isFetchingRepo ? 
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
                : 
            <div className="user-page-cont">
                <div className="user-stat-cont">
                    <div onClick={()=>{extLink(userInfo.html_url)}}>
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
                            <h6>Public Repos:</h6>
                            <p>{userInfo.public_repos}</p>
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

                <div className="toggle-cont">
                    <div className="btn" onClick={handleToggle}>
                        Repositories
                    </div>
                    <div className="btn">
                        Followers
                    </div>
                </div>
                
                {toggle ? 
                <div className="repo-cont">
                    {userRepo.map(repo => (
                        <div key={repo.id} className="repo-card" onClick={()=>{extLink(repo.html_url)}}>
                            <RepoCard 
                                name={repo.name}
                                description={repo.description}
                                language={repo.language}
                                forks={repo.forks}
                            />
                        </div>
                    ))}
                </div> 
                :
                <div className="followers-cont">
                    { userFollowers.map(follower => (
                        <div key={follower.id} onClick={()=>{extLink(follower.html_url)}}>                        
                            <UserCard 
                                img={follower.avatar_url}
                                login={follower.login}
                            />
                        </div>
                    ))
                    }
                </div>
                }

            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userRepo: state.userRepo,
        userInfo: state.userInfo,
        isFetchingRepo: state.isFetchingRepo,
        userFollowers: state.userFollowers,
    }
}

export default connect(
    mapStateToProps,
    {}
)(UserPage);