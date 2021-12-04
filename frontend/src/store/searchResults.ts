import { csrfFetch } from './csrf';
import { SearchResult } from 'interfaces/searchResult'
import { Action } from 'interfaces/redux';

const LOAD_SEARCH_RESULTS = 'session/loadSearchResults';

const loadSearchResults = (searchResults: Array<SearchResult>) => {
    return {
        type: LOAD_SEARCH_RESULTS,
        payload: searchResults,
    };
};

export const getSearchResults = (query: string) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/users/search/${query}`);
    const searchResults = await response.json();
    dispatch(loadSearchResults(searchResults));
    return response;
};

const initialState = {};

const searchResultsReducer = (state = initialState, action: Action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_SEARCH_RESULTS:
            action.payload.forEach((searchResult: SearchResult) => {
                newState[searchResult.id] = searchResult
            })
            return newState;
        default:
            return state;
    }
};

export default searchResultsReducer;
