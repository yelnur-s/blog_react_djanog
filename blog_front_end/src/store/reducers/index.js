import {combineReducers} from 'redux'


import articleReducer from './articleReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'


export default combineReducers({
    articleReducer: articleReducer,
    authReducer,
    errorReducer,
})