import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchUsersData, fetchIndData, toggleNav  } from '../store/actions';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const UserCont = ({
    fetchUsersData,
    fetchIndData,
    users,
    currentPage,
    isFetchingAll,
    toggleNav,
    inProfile
    }) => {

    //checks to see if the user is at the bottom, if so envokes fetchUsersData()
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
            fetchUsersData(currentPage);
        }
    };

    const handleClick = async (login) => {
        await fetchIndData(login);
    };

    //initial component mount
    useEffect(() => {
        fetchUsersData(currentPage);
    }, []);
    
    //resets after user state changes
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [users])

    useEffect(() => {
        toggleNav(false)
    }, [inProfile])

    return (
        <>
            <div className="user-cont">
                {
                    users.map(user => (
                        <div key={user.id} onClick={()=>{handleClick(user.login)}}>
                            <Link to={`/${user.login}`}>
                                <UserCard 
                                    img={user.avatar_url}
                                    login={user.login}
                                />
                            </Link>
                        </div>
                    ))
                }  
            </div>
            {/* loader for next page request */}
        { isFetchingAll && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        </>
    )
};

const mapStateToProps = state => {
    return {
        currentPage: state.currentPage,
        users: state.users,
        isFetchingAll: state.isFetchingAll,
        inProfile: state.inProfile,
    }
};

export default connect(
    mapStateToProps,
     { fetchUsersData,
        fetchIndData,
        toggleNav}
    )(UserCont);