
import {DELETE_ARTICLE, GET_ARTICLE, ADD_ARTICLE, GET_ARTICLES, GET_TAGS, GET_CATEGORIES} from './types'
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


export const getMyArticles = () => dispatch =>{
    axios.get('/api/articles/user/articles')
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_ARTICLES,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 

export const getArticle = (id) => dispatch =>{
    axios.get(`/api/articles/${id}`)
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_ARTICLE,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 
 export const deleteArticle = (id) => dispatch =>{
    axios.delete(`/api/articles/${id}`)
     .then(res => {
         dispatch({
             type: DELETE_ARTICLE,
             payload: id
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
