import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import { connect } from 'react-redux';
import RepoCard from './RepoCard';
import { NavLink } from 'react-router-dom';
import { fetchIndData } from '../store/actions/index';


const UserPage= ({userRepo, userInfo, isFetchingRepo, userFollowers, fetchIndData}) => {

    const [tab, setTab] = useState('repositories');

    const extLink = (url) => {
        window.open(url, '_blank');
    }

    const handleRepoTab = () => {
        setTab('repositories');
    }

    const handleFollowersTab = () => {
        setTab('followers');
    }

    const handleClick = async (login) => {
        await fetchIndData(login);
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
                        <div className="name">
                            <div >
                                <h4>{userInfo.name}</h4>
                            </div>
                        </div>
                        <div className="details">
                            <div>
                                <h6>Location</h6>
                                <p>{userInfo.location}</p>
                            </div>
                            <div>
                                <h6>Public Repos</h6>
                                <p>{userInfo.public_repos}</p>
                            </div>
                            <div>
                                <h6>Followers</h6>
                                <p>{userInfo.followers}</p>
                            </div>
                            <div>
                                <h6>Following</h6>
                                <p>{userInfo.following}</p>
                            </div>
                        </div>
                    <div>
                        </div>
                    </div>
                </div>

                <div className="toggle-cont">
                    <div className={tab === 'repositories' ? 'btn btn-active' : 'btn btn-inactive'} onClick={handleRepoTab}>
                        Repositories
                    </div>
                    <div className={tab === 'followers' ? 'btn btn-active' : 'btn btn-inactive'} onClick={handleFollowersTab}>
                        Followers
                    </div>
                </div>
                
                {tab === 'repositories'? 
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
                        <div key={follower.id} onClick={()=>{handleClick(follower.login)}}>
                            <NavLink to={`/${follower.login}`}>                      
                                <UserCard 
                                    img={follower.avatar_url}
                                    login={follower.login}
                                />
                            </NavLink>  
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
    { fetchIndData }
)(UserPage);