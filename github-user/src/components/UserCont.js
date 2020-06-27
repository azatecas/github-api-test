import React, { useState, useEffect, useRef } from 'react'
import { UserCard } from './UserCard';
import { dummyUsers } from './DummyData';

export const UserCont = () => {
    const [users, setUsers] = useState(dummyUsers);
    const [currentPage, setCurrentPage] = useState(`https://api.github.com/users?since=0`);
    const [isFetching, setIsFetching] = useState(false);

    //tracks of the most current state for the link url
    const currentPageRef = useRef(currentPage);
    currentPageRef.current = currentPage;

    //fetches data from GITHUB USERS API and spreading it to users state


    //checks to see if the user is at the bottom, if so envokes fetchUsersData()
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        fetchUsersData(currentPage);
    }

    // //initial component mount
    // useEffect(() => {
    //         fetchUsersData(currentPageRef.current);
    //     }, []);
    
    // //resets after user state changes
    // useEffect(() => {
    //     setIsFetching(true);
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    //     }, [users]);


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
            { isFetching && <h1>SUPER LOADING</h1>}
            
        </div>
    )
}