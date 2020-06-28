import {
    FETCH_USERS,
    FETCH_PAGINATION_LINK,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_IND,
    FETCH_IND_SUCCESS,
    FETCH_IND_REPO,
    FETCH_IND_REPO_SUCCESS,
    FETCH_IND_REPO_FAIL,
    FETCH_IND_FAIL,
    FETCH_FOLLOWERS_LINK,
    FETCH_REPO_LINK,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL

} from '../actions/index';

const initialState = {
    users: [],
    currentPage: 'https://api.github.com/users?since=0',
    currentRepoPage: '',
    currentFollowerPage: '',
    isFetchingAll: false,
    isFetchingInd: false,
    isFetchingRepo: false,
    userInfo: {},
    userRepo: [],
    userFollowers:[],
    errorAll: null,
    errorUser: null,
    errorRepo: null,
    errorFollowers: null,
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
        
        case FETCH_IND:
            return { 
                ...state,
                isFetchingInd: true,
            }
        
        case FETCH_IND_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                isFetchingInd: false,
            }
        case FETCH_IND_REPO:
            return {
                ...state,
                isFetchingRepo: true,
            }
        
        case FETCH_IND_REPO_SUCCESS:
            return {
                ...state,
                userRepo: [...action.payload],
                isFetchingRepo: false,
            }
        
        case FETCH_IND_REPO_FAIL:
            return {
                ...state,
                errorRepo: action.payload,
                isFetchingRepo: false,
            }
        case FETCH_REPO_LINK:
            return {
                ...state,
                currentRepoPage: action.payload,
            }
        case FETCH_FOLLOWERS_LINK:
            return {
                ...state,
                currentFollowerPage: action.payload,
            }
        case FETCH_FOLLOWERS_SUCCESS:
            return {
                ...state,
                userFollowers:[...state.userFollowers, ...action.payload]
            }
        case FETCH_FOLLOWERS_FAIL:
            return {
                ...state,
                errorFollowers: action.payload
            }
        
        case FETCH_IND_FAIL:
            return {
                ...state,
                errorUser: action.payload,
                isFetchingInd: false
            }
        default:
            return state
    }
}