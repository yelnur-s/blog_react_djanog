



import {DELETE_ARTICLE, GET_ARTICLE, ADD_ARTICLE, GET_ARTICLES, GET_CATEGORIES, GET_TAGS} from '../actions/types'


const initialState = {
   articles: [],
   tags: [],
   categories: [],
   article: {}
}

export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        case GET_ARTICLE:
            return {
                ...state,
                article: action.payload
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
        case DELETE_ARTICLE:
            console.log(action.payload) // id article 

            return {
                ...state,
                articles: removeById(state.articles, action.payload)
            }
        default:
            return state;
    }
}


function removeById(list, id) {
    for(let i = list.length - 1; i >= 0; i--) {
        if(list[i].id === id) {
            list.splice(i, 1)
            break
        }
    }
    return [...list]
}






