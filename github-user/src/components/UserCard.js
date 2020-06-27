import React, {useState} from 'react';
import gitImg from '../img/github.png'

export const UserCard = ({login, img, id}) => {
    const [bool, setBool] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [repos, setRepos] = useState(null)


    const fetchUserData = (login) => {
        fetch(`https://api.github.com/users/${login}`)
            .then(response => response.json())
            .then(data =>{ 
                console.log(data);
                setUserInfo(data)
                fetch(data.repos_url)
                    .then(res => res.json())
                    .then(dataRes => {
                        console.log("mmmmmmmmmmmmmmmm",dataRes);
                        setRepos(dataRes);
                    })
                    .catch(err => console.log("ERROR FETCHING USER REPOS"))
            })
            .catch(err => console.log("ERROR FETCHING USER PROFILE INFO", err)
            );
    }

    const  handleClick = async (e, login) => {
        e.preventDefault();
        e.stopPropagation();
        
        if(await !userInfo){
            fetchUserData(login);
        }

    }


    return (
        <div className="user-card" onClick={async (e)=>{ await handleClick(e, login)}}>
            <div className="card-bg1">

            </div>

            <div className="card-bg2">

            </div>

            <div className="card-info-cont">
                <img id="profile-img" src={img} alt={login} />
                <h3>{login}</h3> 
                <img id="logo" src={gitImg} alt="github" />

            </div>
            
        </div>
    )
}