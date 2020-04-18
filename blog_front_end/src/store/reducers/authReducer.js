


import {USER_LOGIN, USER_SIGNUP, USER_LOGOUT} from '../actions/types'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const initialState = {
  isAuth: false,
  currentUserId: null,
  signUpSuccess: false
}

export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case USER_SIGNUP:
            return {
                ...state,
                signUpSuccess: !state.signUpSuccess
            }
        case USER_LOGIN:
            const payload = jwt_decode(action.payload)
            if(payload.exp < new Date().getTime() / 1000) {
                return {
                    ...state,
                    isAuth: false,
                    currentUserId: null
                }
            } 
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`
            return {
                ...state,
                isAuth: true,
                currentUserId: payload.user_id
            }
        case USER_LOGOUT:
            localStorage.removeItem('access_token')
            delete axios.defaults.headers.common["Authorization"]
            return {
                ...state,
                isAuth: false,
                currentUserId: null
            }
        default:
            return state;
    }
}






