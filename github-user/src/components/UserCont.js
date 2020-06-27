import React from 'react';
import { connect } from 'react-redux';
import { UserCard } from './UserCard';
import { dummyUsers } from './DummyData';
import { fetchUsersData } from '../store/actions';

const UserCont = ({fetchUsersData, users, currentPage, isFetchingAll}) => {
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
        fetchUsersData(currentPage);
    }

    //initial component mount
    useEffect(() => {
            fetchUsersData(currentPage);
        }, []);
    
    //resets after user state changes
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        }, [users]);


    return (
        <div className="user-cont">
            {
                users.map((user, index) => (
                    <div key={user.id}>
                        <UserCard
                            id={user.id}
                            login={user.login}
                            img={user.avatar_url}
                        />
                    </div>
                ))
            }  
            { isFetchingAll && <h1>SUPER LOADING</h1>}
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.currentPage,
        users: state.users,
        isFetchingAll: state.isFetchingAll,
    }
}


export default connect(
    mapStateToProps,
     { fetchUsersData })
    (UserCont)