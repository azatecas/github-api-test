import React, { useEffect } from 'react';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIndData, fetchNextSearch, toggleNav } from '../store/actions';
import  parse  from 'parse-link-header';


const SearchPage = ({
    searchResults,
    nextSearchLink,
    isSearching,
    fetchIndData,
    fetchNextSearch,
    toggleNav
    }) => {

    const handleClick = async (login) => {
        await fetchIndData(login);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        };

        let headerLink = parse(nextSearchLink);
        if(headerLink !== null || headerLink !== '' ){ 
            fetchNextSearch(headerLink.next.url);
        };
    };
        
    useEffect(() => {
        window.onpopstate = e => {
            toggleNav(false);
         };
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
             <div className="user-cont">
                 { isSearching && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}  
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
    };
};

export default connect(mapStateToProp,{fetchIndData,fetchNextSearch, toggleNav})(SearchPage);