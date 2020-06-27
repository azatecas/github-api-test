import {
    FETCH_USERS,
    FETCH_PAGINATION_LINK,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
} from '../actions/index';


const initialState = {
    users: [],
    currentPage: 'https://api.github.com/users?since=0',
    isFetchingAll: false,
    isFetchingInd: false,
    userInfo: null,
    userRepos: null,
    errorAll: null,
    errorUser: null,
    errorRepo: null,
}


export const githubUserReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                isFetchingAll:true
            }

        case FETCH_PAGINATION_LINK:
            return {
                ...state,
                currentPage: action.payload
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users:[...state.users, ...action.payload],
                isFetchingAll: false,
            }
        
        case FETCH_USERS_FAIL:
            return {
                ...state,
                isFetchingAll: false,
                errorAll: action.payload
            }
        
        break;
        case value:
        
        break;
        case value:
        
        break;
        case value:
        
        break;
        case value:
        
        break;
        case value:
        
        break;
    
        default:
            break;
    }
}