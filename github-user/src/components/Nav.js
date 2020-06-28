import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchUser } from '../store/actions'


const Nav = ({isSearching, nextSearchLink, searchResults, searchUser}) => {
    const [search, setSearch] = useState('');

    const handleChange = e => {
        setSearch(
            e.target.value.toLowerCase()
        )
    }

    const handleSubmit = search => {
        searchUser(search);
    }

    return(
        <nav>
            <input
                className="search-bar"
                name="search"
                label="search" 
                placeholder="Search by Handle🔍"
                onChange={handleChange}
            /> 
            <button onClick={()=>{handleSubmit(search)}}>Search</button>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        isSearching:state.isSearching,
        nextSearchLink: state.nextSearchLink,
        searchResults: state.searchResults,
    }
}

export default connect(
    mapStateToProps,
    {searchUser}
)(Nav);