import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchUser } from '../store/actions'
import { useHistory } from 'react-router-dom';


const Nav = ({isSearching, nextSearchLink, searchResults, searchUser,inProfile}) => {
    const [search, setSearch] = useState('');
    const [profile, setProfile] = useState(false);
    const history = useHistory();
    const handleChange = e => {
        setSearch(
            e.target.value.toLowerCase()
        )
    }

    const handleSubmit = (e, search) => {
        e.preventDefault();
        searchUser(search);
        history.push('/search');
    }

    useEffect(() => {
        setProfile(inProfile);
    }, [inProfile]);

    return(
        <nav>
            { inProfile ? 
                <h3>Profile</h3>
                : 
                <form>
                    <input
                        className="search-bar"
                        name="search"
                        label="search" 
                        placeholder="🔍Search by Users"
                        onChange={handleChange}
                    /> 
                    <button type="submit" onClick={(e)=>{handleSubmit(e,search)}}>Search</button>
                </form>
            }
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        inProfile: state.inProfile,
        isSearching:state.isSearching,
        nextSearchLink: state.nextSearchLink,
        searchResults: state.searchResults,
    }
}

export default connect(
    mapStateToProps,
    {searchUser}
)(Nav);