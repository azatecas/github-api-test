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
    FETCH_FOLLOWERS_FAIL,
    FETCH_SEARCH,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAIL,
    FETCH_NEXT_SEARCH_SUCCESS,
    NEXT_SCROLL_START,
    NEXT_SCROLL_SEARCH_SUCCESS,
    NEXT_SCROLL_SEARCH_FAIL,
    NEXT_SCROLL_SEARCH_LINK,
    NEXT_FOLLOWERS_START,
    NEXT_FOLLOWERS_SUCCESS,
    NEXT_FOLLOWERS_FAIL,
    NEXT_FOLLOWERS_LINK,
    NEXT_REPO_START,
    NEXT_REPO_SUCCESS,
    NEXT_REPO_FAIL,
    NEXT_REPO_LINK,
    IN_PROFILE

} from '../actions/index';

const initialState = {
    users: [],
    currentPage: 'https://api.github.com/users?since=0',
    currentRepoPage: '',
    currentFollowerPage: '',
    isFetchingAll: false,
    isFetchingInd: false,
    isFetchingRepo: false,
    isFetchingFollowers: false,
    userInfo: {},
    userRepo: [],
    userFollowers:[],
    errorAll: null,
    errorUser: null,
    errorRepo: null,
    errorFollowers: null,
    isSearching: false,
    errorSearch: null,
    nextSearchLink: '',
    searchResults:[],
    nextFollowersLink:'',
    nextRepoLink:'',
    inProfile:false,
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
                nextFollowersLink: action.payload,
            }

        case FETCH_FOLLOWERS_SUCCESS:
            return {
                ...state,
                userFollowers:[...action.payload]
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

    //state for search results
        case FETCH_SEARCH:
            return {
                ...state,
                isSearching: true,
            }

        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                searchResults:[...action.payload.items],
                isSearching: false,
            }

        case FETCH_SEARCH_FAIL: 
            return {
                ...state,
                isSearching: false,
                errorSearch: action.payload,
            }

    //state for infinite scroll on search results
        case  FETCH_NEXT_SEARCH_SUCCESS:
            return {
                ...state,
                nextSearchLink: action.payload,
            }
        case NEXT_SCROLL_START:
            return {
                ...state,
                isSearching: true,
            }
        case NEXT_SCROLL_SEARCH_SUCCESS:
            return {
                ...state,
                searchResults:[...state.searchResults, ...action.payload.items],
                isSearching: false,
            }
        case NEXT_SCROLL_SEARCH_FAIL: 
            return {
                ...state,
                isSearching: false,
                errorSearch: action.payload,
            }
        case  NEXT_SCROLL_SEARCH_LINK:
            return {
                ...state,
                nextSearchLink: action.payload,
            }

    //STATE FOR FETCHING NEXT PAGE OF FOLLOWERS ON SCROLL
        case NEXT_FOLLOWERS_START:
            return {
                ...state,
                isFetchingFollowers: true,
            }
        case NEXT_FOLLOWERS_SUCCESS:
            return {
                ...state,
                userFollowers:[...state.userFollowers, ...action.payload],
                isFetchingFollowers: false,
            }
        case NEXT_FOLLOWERS_FAIL: 
            return {
                ...state,
                isFetchingFollowers: false,
                errorFollowers: action.payload,
            }
        case NEXT_FOLLOWERS_LINK:
            return {
                ...state,
                nextFollowersLink: action.payload,
            }

        //STATE FOR FETCHING NEXT PAGE OF REPO ON SCROLL
        case NEXT_REPO_START:
            return {
                ...state,
                isFetchingRepo: true,
            }
        case NEXT_REPO_SUCCESS:
            return {
                ...state,
                userRepo:[...state.userRepo, ...action.payload],
                isFetchingRepo: false,
            }
        case NEXT_REPO_FAIL: 
            return {
                ...state,
                isFetchingRepo: false,
                errorRepo: action.payload,
            }
        case NEXT_REPO_LINK:
            return {
                ...state,
                currentRepoPage: action.payload,
            }
        case IN_PROFILE:
            return {
                ...state,
                inProfile: action.payload,
            }

        default:
            return state
    }
}