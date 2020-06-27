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
    const fetchUserData = (url) => {
        fetch(url)
            .then(response => {
                //extracts from Header the Link property and sets it to CurrentPage for next lazy loading
                response.headers.forEach((value, name) => {
                    if (name === 'link') {
                        let myLink = value.split(';');
                        let nextLink = myLink[0].replace(/<(.*)>/, '$1').trim()
                        setCurrentPage(nextLink );
                    }
                })
                return response.json()            
            })
            .then(data =>{ 
                console.log(data);
                //adds new Users to current state
                setUsers([...users, ...data]);
                setIsFetching(false);
            })
            .catch(err => console.log("ERROR FETCHING USERS", err)
            );
    }

    //checks to see if the user is at the bottom, if so envokes fetchUserData()
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        fetchUserData(currentPageRef.current);
    }

    // //initial component mount
    // useEffect(() => {
    //         fetchUserData(currentPageRef.current);
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