import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIndData, fetchNextSearch } from '../store/actions';
import  parse  from 'parse-link-header';




const SearchPage = ({searchResults, nextSearchLink, isSearching, fetchIndData, fetchNextSearch}) => {


    const handleClick = async (login) => {
        await fetchIndData(login);
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        let headerLink = parse(nextSearchLink);
        fetchNextSearch(headerLink.next.url);
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [searchResults]);

    return (
        <>  
            <div className="user-cont">
                    { searchResults.map(user => (
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
        </>
    )
}

const mapStateToProp = state => {
    return {
        searchResults: state.searchResults,
        nextSearchLink: state.nextSearchLink,
        isSearching: state.isSearching,
        nextSearchLink: state.nextSearchLink,
    }
}

export default connect(mapStateToProp,{fetchIndData,fetchNextSearch})(SearchPage);