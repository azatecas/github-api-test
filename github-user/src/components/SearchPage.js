import React, { useState } from 'react';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIndData } from '../store/actions';




const SearchPage = ({searchResults, nextSearchLink, isSearching, fetchIndData}) => {

    const handleClick = async (login) => {
        await fetchIndData(login);
    }
    
    return (
        <>
            <div className="user-cont">
                { !isSearching ? 
                    <h1>Loading...</h1> 
                    : 
                    <div>
                        { searchResults.map((user, index) => (
                        <div key={user.id} onClick={()=>{handleClick(user.login)}}>
                            <Link to={`/${user.login}`}>
                                <UserCard 
                                    img={user.avatar_url}
                                    login={user.login}
                                />
                            </Link>
                        </div>
                        ))}
                    </div>                    
                }  
            </div>
        </>
    )
}

const mapStateToProp = state => {
    return {
        searchResults: state.searchResults,
        nextSearchLink: state.nextSearchLink,
        isSearching: state.isSearching,
    }
}

export default connect(mapStateToProp,{fetchIndData})(SearchPage);