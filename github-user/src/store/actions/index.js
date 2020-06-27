
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_PAGINATION_LINK = "FETCH_PAGINATION_LINK";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";

//fetches all users data from GITHUB USERS API
export const fetchUsersData = (url) => (dispatch) => {
    dispatch({type: FETCH_USERS});

    fetch(url)
        .then(response => {
            //extracts from Header the Link property and sets it to CurrentPage for next lazy loading
            response.headers.forEach((value, name) => {
                if (name === 'link') {
                    let myLink = value.split(';');
                    let nextLink = myLink[0].replace(/<(.*)>/, '$1').trim();
                    dispatch({type: FETCH_PAGINATION_LINK, payload: nextLink});
                }
            })
            return response.json();            
        })
        .then(data =>{ 
            //adds new Users to current state
            dispatch({type: FETCH_USERS_SUCCESS, payload: data});
        })
        .catch(err => {
            console.log("ERROR FETCHING USERS", err);
            dispatch({type:FETCH_USERS_FAIL, payload:err});
        });
}


export const FETCH_IND = "FETCH_IND";
export const FETCH_IND_SUCCESS = "FETCH_IND_SUCCESS";
export const FETCH_IND_REPO_SUCCESS = "FETCH_IND_REPO_SUCCESS";
export const FETCH_IND_REPO_FAIL = "FETCH_IND_REPO_FAIL";
export const FETCH_IND_FAIL = "FETCH_IND_FAIL";


//fetches github user individual data
export const fetchIndData = (login) => (dispatch) => {
    dispatch({type: FETCH_IND})

    fetch(`https://api.github.com/users/${login}`)
        .then(response => response.json())
        .then(data =>{ 
            dispatch({type:FETCH_IND_SUCCESS, payload: data})
            fetch(data.repos_url)
                .then(res => res.json())
                .then(dataRes => {
                    dispatch({type: FETCH_IND_REPO_SUCCESS, payload: dataRes})
                })
                .catch(err => {
                    console.log("ERROR FETCHING USER REPOS");
                    dispatch({type: FETCH_IND_REPO_FAIL, payload: err})
                })
        })
        .catch(err => {
            console.log("ERROR FETCHING USER PROFILE INFO", err);
            dispatch({type: FETCH_IND_FAIL, payload: err})
        });
}