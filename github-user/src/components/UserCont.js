import React, {useEffect} from 'react';
import { connect } from 'react-redux';
// import UserCard from './UserCard';
import { dummyUsers } from './DummyData';
import { fetchUsersData, fetchIndData  } from '../store/actions';
import gitImg from '../img/github.png';

const UserCont = ({fetchUsersData, fetchIndData, users, currentPage, isFetchingAll, userInfo, isFetchingInd}) => {
    // const [users, setUsers] = useState(dummyUsers);
    // const [currentPage, setCurrentPage] = useState(`https://api.github.com/users?since=0`);
    // const [isFetching, setIsFetching] = useState(false);

    //tracks of the most current state for the link url
    // const currentPageRef = useRef(currentPage);
    // currentPageRef.current = currentPage;




    //checks to see if the user is at the bottom, if so envokes fetchUsersData()
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        console.log("CURREEECT PAGE",currentPage)
        fetchUsersData(currentPage);
    }


    const handleClick = (login) => {
        fetchIndData(login);
    }

    // console.log(window.scrollY)
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
                        <div key={user.id} className="user-card" onClick={()=>{handleClick(user.login)}}>
                            <div className="card-bg1"/>

                            <div className="card-bg2"/>

                            <div className="card-info-cont">
                                <img id="profile-img" src={user.avatar_url} alt={user.login} />
                                <h3>{user.login}</h3> 
                                <img id="logo" src={gitImg} alt="github" />

                            </div>
                    
                        </div>
                    ))
                }  
                
                
            </div>
        { isFetchingAll && <h1>SUPER LOADING</h1>}
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