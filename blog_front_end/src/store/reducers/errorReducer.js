




import {ERROR_HANDLE} from '../actions/types'


const initialState = {
  error: {}
}

export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case ERROR_HANDLE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}






