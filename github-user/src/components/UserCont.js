import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchUsersData, fetchIndData  } from '../store/actions';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const UserCont = ({fetchUsersData, fetchIndData, users, currentPage, isFetchingAll, userInfo, isFetchingInd}) => {

    //checks to see if the user is at the bottom, if so envokes fetchUsersData()
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        console.log("CURREEECT PAGE",currentPage)
        fetchUsersData(currentPage);
    }

    const handleClick = async (login) => {
        await fetchIndData(login);
    }

    //initial component mount
    useEffect(() => {
            fetchUsersData(currentPage);
    }, []);
    
    //resets after user state changes
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [users, isFetchingAll]);


    return (
        <>
            <div className="user-cont">
                {
                    users.map((user, index) => (
                        <div key={user.id} onClick={()=>{handleClick(user.login)}}>
                            <Link to={`users/${user.login}`}>
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
        { isFetchingAll && <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.currentPage,
        users: state.users,
        isFetchingAll: state.isFetchingAll,
        isFetchingInd: state.isFetchingInd,
        userInfo: state.userInfo,
    }
}


export default connect(
    mapStateToProps,
     { fetchUsersData,
        fetchIndData,  })
    (UserCont)