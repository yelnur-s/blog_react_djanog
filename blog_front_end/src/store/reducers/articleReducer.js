
import {ADD_ARTICLE, GET_ARTICLES, GET_CATEGORIES, GET_TAGS} from '../actions/types'


const initialState = {
   articles: [],
   tags: [],
   categories: []
}

export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_TAGS:
            return {
                ...state,
                tags: action.payload
            }
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, action.payload]
            }
        default:
            return state;
    }
}






