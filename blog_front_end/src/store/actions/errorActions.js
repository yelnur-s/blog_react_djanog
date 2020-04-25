



import {ERROR_HANDLE} from './types'

export const errorReset = (err) => dispatch =>{
    dispatch({
        type: ERROR_HANDLE,
        payload: {}
    })
};
