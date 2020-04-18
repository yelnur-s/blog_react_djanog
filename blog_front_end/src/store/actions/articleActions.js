
import {ADD_ARTICLE, GET_ARTICLES, GET_TAGS, GET_CATEGORIES} from './types'
import axios from 'axios'


export const getArticles = () => dispatch =>{
   axios.get('/api/articles')
    .then(res => {
        console.log("Response: ", res, res.data)
        dispatch({
            type: GET_ARTICLES,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
};



export const getTags = () => dispatch =>{
    axios.get('/api/tags')
     .then(res => {
         dispatch({
             type: GET_TAGS,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 

 
export const getCatgories = () => dispatch =>{
    axios.get('/api/categories')
     .then(res => {
         dispatch({
             type: GET_CATEGORIES,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 
 export const saveArticle = data => dispatch =>{
    const fm = new FormData()
    Object.keys(data).map(key => {
        if(key !== 'tags') fm.append([key], data[key])
        else {
            data[key].map(tag => fm.append([key], tag))
        }
    })


    axios.post('/api/articles', fm, {
        headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg2Njk2ODk4LCJqdGkiOiJjOGM4ZjJiYjY0NTE0ZDc3YmM3YjdkNDY4ZDJiZDlmOSIsInVzZXJfaWQiOjR9.28CyrjY0qExeSjKR829_VdEWYHMKAIBXoOWBjkVhGr0",
        "Content-Type": undefined
    }})
     .then(res => {
         dispatch({
             type: ADD_ARTICLE,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
