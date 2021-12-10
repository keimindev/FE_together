import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {axiosInstance} from "../../config";

const SET_JOIN = "SET_JOIN";


const setJoin = createAction(SET_JOIN, (postid) => ({postid}))

const initialState = {
    userId : 1,
    joinCheck : false
}

const token = localStorage.getItem('token')

const send_Join = (postid) => {
    return function( dispatch, getState, {history}){
    
        axiosInstance.post(`/api/join/${postid}`, {
            userId : 1,
            joinCheck : false
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            }).then((res) =>{
                console.log(res)
                dispatch(setJoin(res))
            }).catch((err)=> console.log(err))
     }
}


export default handleActions({
    [SET_JOIN] : (state, action) => produce(state, (draft) => {
        draft.userId = action.payload.userid
        draft.joinCheck = true
    }),

}, initialState)



const actionsCreators = {
    setJoin,
    send_Join,
  
}

export { actionsCreators }



