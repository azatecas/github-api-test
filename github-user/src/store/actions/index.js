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
};

export const FETCH_IND = "FETCH_IND";
export const FETCH_IND_SUCCESS = "FETCH_IND_SUCCESS";
export const FETCH_IND_REPO = "FETCH_IND_REPO";
export const FETCH_IND_REPO_SUCCESS = "FETCH_IND_REPO_SUCCESS";
export const FETCH_IND_REPO_FAIL = "FETCH_IND_REPO_FAIL";
export const FETCH_IND_FAIL = "FETCH_IND_FAIL";
export const FETCH_FOLLOWERS_LINK = "FETCH_FOLLOWERS_LINK";
export const FETCH_REPO_LINK = "FETCH_REPO_LINK";
export const FETCH_FOLLOWERS_SUCCESS = "FETCH_FOLLOWERS_SUCCESS";
export const FETCH_FOLLOWERS_FAIL = "FETCH_FOLLOWERS_FAIL";

//fetches github user individual data
export const fetchIndData = (login) => (dispatch) => {
    dispatch({type: FETCH_IND})

    fetch(`https://api.github.com/users/${login}`)
        .then(response => response.json())
        .then(data =>{ 
            dispatch({type:FETCH_IND_SUCCESS, payload: data})
            dispatch({type: FETCH_IND_REPO })
            //fetches repos for selected user
            fetch(data.repos_url)
                .then(res => {
                    res.headers.forEach((value, name) => {
                        if (name === 'link') {
                            dispatch({type: FETCH_REPO_LINK, payload: value});
                        }
                    })
                    return res.json()
                })
                .then(dataRes => {
                    dispatch({type: FETCH_IND_REPO_SUCCESS, payload: dataRes})
                })
                .catch(err => {
                    console.log("ERROR FETCHING USER REPOS");
                    dispatch({type: FETCH_IND_REPO_FAIL, payload: err})
                })
            
            //fetches followers for selected user
            fetch(data.followers_url)
                .then(res => {
                    res.headers.forEach((value, name) => {
                        if (name === 'link') {
                            dispatch({type: FETCH_FOLLOWERS_LINK, payload: value});
                        }
                    })
                    return res.json()
                })
                .then(dataRes => {
                    dispatch({type: FETCH_FOLLOWERS_SUCCESS, payload: dataRes})
                })
                .catch(err => {
                    console.log("ERROR FETCHING USER REPOS");
                    dispatch({type: FETCH_FOLLOWERS_FAIL, payload: err})
                })
        })
        .catch(err => {
            console.log("ERROR FETCHING USER PROFILE INFO", err);
            dispatch({type: FETCH_IND_FAIL, payload: err})
        });
};

//handles search results and dispatches data to state
export const FETCH_SEARCH = "FETCH_SEARCH";
export const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
export const FETCH_SEARCH_FAIL = "FETCH_SEARCH_FAIL";
export const FETCH_NEXT_SEARCH_SUCCESS = "FETCH_NEXT_SEARCH_SUCCESS";

export const searchUser = (search) => dispatch => {
    dispatch({ type: FETCH_SEARCH })
    fetch(`https://api.github.com/search/users?q=${search}`)
    .then(res => {
        res.headers.forEach((value, name) => {
            if (name === 'link') {
                dispatch({ type: FETCH_NEXT_SEARCH_SUCCESS, payload: value})
            }
        })
        return res.json();
    })
    .then(data => {
        dispatch({ type: FETCH_SEARCH_SUCCESS, payload: data})
    })
    .catch(err => {
        console.log("ERROR SEARCHING", err);
        dispatch({ type: FETCH_SEARCH_FAIL, payload: err})
    });
};

//handles infinite scroll for search results 
export const NEXT_SCROLL_START = 'NEXT_SCROLL_START';
export const NEXT_SCROLL_SEARCH_SUCCESS = 'NEXT_SCROLL_SEARCH_SUCCESS';
export const NEXT_SCROLL_SEARCH_FAIL = 'NEXT_SCROLL_SEARCH_FAIL';
export const NEXT_SCROLL_SEARCH_LINK = 'NEXT_SCROLL_SEARCH_LINK';

export const fetchNextSearch = (nextUrl) => (dispatch) =>{
    dispatch({ type: NEXT_SCROLL_START});
    fetch(nextUrl)
        .then(res => {
            res.headers.forEach((value, name) => {
                if (name === 'link') {
                    dispatch({ type: NEXT_SCROLL_SEARCH_LINK, payload: value});
                }
            })
            return res.json();
        })
        .then(data => {
            dispatch({ type: NEXT_SCROLL_SEARCH_SUCCESS, payload: data});
        })
        .catch(err => {
            console.log("ERROR SEARCHING", err);
            dispatch({ type: NEXT_SCROLL_SEARCH_FAIL, payload: err});
        });
};

//handles infinite scroll for followers tab inside user profile page
export const NEXT_FOLLOWERS_START = 'NEXT_FOLLOWERS_START';
export const NEXT_FOLLOWERS_SUCCESS = 'NEXT_FOLLOWERS_SUCCESS';
export const NEXT_FOLLOWERS_FAIL = 'NEXT_FOLLOWERS_FAIL';
export const NEXT_FOLLOWERS_LINK = 'NEXT_FOLLOWERS_LINK';

export const fetchNextFollowers = (nextUrl) => (dispatch) =>{
    dispatch({ type: NEXT_FOLLOWERS_START});
    fetch(nextUrl)
        .then(res => {
            res.headers.forEach((value, name) => {
                if (name === 'link') {
                    dispatch({ type: NEXT_FOLLOWERS_LINK, payload: value})
                }
            })
            return res.json()
        })
        .then(data => {
            dispatch({ type: NEXT_FOLLOWERS_SUCCESS, payload: data})
        })
        .catch(err => {
            console.log("ERROR SEARCHING", err);
            dispatch({ type: NEXT_FOLLOWERS_FAIL, payload: err});
        })
};

//Handles fetch request for Repositories on Scroll, Deprecated since github repo enpoint doesn't return Header Pagination

export const NEXT_REPO_START = 'NEXT_FOLLOWERS_START';
export const NEXT_REPO_SUCCESS = 'NEXT_FOLLOWERS_SUCCESS';
export const NEXT_REPO_FAIL = 'NEXT_FOLLOWERS_FAIL';
export const NEXT_REPO_LINK = 'NEXT_FOLLOWERS_LINK';

export const fetchNextRepo = (nextUrl) => (dispatch) =>{
    dispatch({ type: NEXT_REPO_START});
    fetch(nextUrl)
        .then(res => {
            res.headers.forEach((value, name) => {
                if (name === 'link') {
                    dispatch({ type: NEXT_REPO_LINK, payload: value});
                }
            })
            return res.json();
        })
        .then(data => {
            dispatch({ type: NEXT_REPO_SUCCESS, payload: data});
        })
        .catch(err => {
            console.log("ERROR SEARCHING", err);
            dispatch({ type: NEXT_REPO_FAIL, payload: err});
        });
};



export const IN_PROFILE = "IN_PROFILE";
export const toggleNav = (current) => (dispatch) => {
    dispatch({ type:IN_PROFILE, payload: current})
};