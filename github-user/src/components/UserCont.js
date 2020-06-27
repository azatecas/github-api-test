import React, { useState, useEffect } from 'react'
import { UserCard } from './UserCard';




export const UserCont = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch('https://api.github.com/users?since=1')
            .then(response => response.json())
            .then(data =>{ 
                console.log(data);
                setUsers(data);
            })
            .catch(err => console.log("ERROR FETCHING USERS", err));
    }, []);

    return (
        <div className="user-cont">

            {
                users.map((user, index) => (
                    <div key={user.id}>
                        <UserCard
                            login={user.login}
                            img={user.avatar_url}

                        />
                    </div>
                ))
            }
            
        </div>
    )
}