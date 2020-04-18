




import {USER_LOGIN, USER_SIGNUP, USER_LOGOUT} from './types'
import axios from 'axios'


export const signUp = (user) => dispatch =>{
   axios.post('/api/signup', user)
    .then(res => {
        console.log("Response: ", res.data)
        dispatch({
            type: USER_SIGNUP,
        })

        setTimeout(() => {
            dispatch({
                type: USER_SIGNUP,
            })
        }, 1000)

    })
    .catch(err => console.log(err))
};


export const logIn = (user) => dispatch =>{
    axios.post('/api/login', user)
     .then(res => {
         localStorage.setItem('access_token', res.data.access)
         dispatch({
             type: USER_LOGIN,
             payload: res.data.access
         })
     })
     .catch(err => console.log(err))
 };

 export const logOut = () => dispatch =>{
    dispatch({
        type: USER_LOGOUT
    })
 };
 
 
 
