import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from 'moment'
import axios from 'axios'

const SET_LIST = "SET_LIST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const SET_MYPAGE = "SET_MYPAGE";

const setList = createAction(SET_LIST, (postlist) => ({postlist}))
const addPost = createAction(ADD_POST, (post) => ({post}))
const editPost = createAction(EDIT_POST, (post, post_Id) => ({post, post_Id}))
const setMypage = createAction(SET_MYPAGE, (list) => ({list}))

const initialState = {
    list: [
        {"postId" : "1", "title": "리액트 모집", "subject": "react", "userName":"min", "content" : "프론트 엔드 팀원 한 분을 모집하고 있습니다. 리엑트 사용 가능 Redux 활용 경험, GIT 활용한 프로젝트 경험이 있으신 팀원을 모집합니다!", "deadline_date": "2021-12-14", "currentState": 1, "state": 5 },
        {"postId" : "2", "title": "node 모집", "subject": "node", "userName":"kei", "content" : "알고리즘 스터드 한 분을 모집하고 있습니다. 리엑트 사용 가능 Redux 활용 경험, GIT 활용한 프로젝트 경험이 있으신 팀원을 모집합니다!", "deadline_date": "2021-12-18", "currentState": 2, "state": 6 },
    ],
    userInfo : {
        userInfo : [
            {password: "********",
             userId: "test@test.com",
             userName: "Min"
            }],
        myPost : [{
            currentState: 1,
            deadline_date: "2021-12-11",
            postId: "1",
            state: 5,
            subject: "react",
            title: "일욜 오전에 같이 공부하실 분",
            userName: "min",
        },
        {
            currentState: 1,
            deadline_date: "2021-12-15",
            postId: "3",
            state: 5,
            subject: "react",
            title: "리액트 뽀개기 함께 하실 분",
            userName: "min",
        }
    ],
        myJoin : [
            {currentState: 1,
                deadline_date: "2021-12-11",
                postId: "1",
                state: 5,
                subject: "react",
                title: "리액트 공부합니다",
                userName: "young"
            },
            {
                currentState: 2,
                deadline_date: "2021-12-13",
                postId: "2",
                state: 4,
                subject: "react",
                title: "사이드 프로젝트 팀원 모집",
                userName: "test2",
            },            {currentState: 1,
                deadline_date: "2021-12-11",
                postId: "1",
                state: 5,
                subject: "react",
                title: "리액트 공부합니다",
                userName: "young"
            },

        ],
    },
}

const initialPost = {
    postId : "1",
    userId : "min@min.com",
    userName : "min",
    content : "this is content",
    title : "this is title",
    deadline_date: "2021-11-20",
    subject : "react",
    currentState : 1,
    state: 5,
    createdAt : "2021-12-07 10:00:00"
}


const set_List = (postlist) =>{
    return function(dispatch, getState, {history}){
        // axios.get('https://03556368-8df5-49f4-bdfe-0643dfec0053.mock.pstmn.io/api/post', )
        // .then(function(response){
        //     dispatch(setList(response.data))
        // }).catch(function(error){
        //     console.log(error)
        // })

        // dispatch(setList(postlist))
    }

}

const add_Post = (item) =>{
    return function(dispatch, getState, {history}){
        const _post = {
            ...initialPost,
            title: item.title,
            content: item.content,
            subject: item.subject,
            deadline_date : item.deadline,
            state : item.state,
            createdAt : moment().format("YYYY-MM-DD")
        }
        
        // axios.post("https://03556368-8df5-49f4-bdfe-0643dfec0053.mock.pstmn.io/api/write", _post)
        //         .then((res) =>{console.log(res)})
        //         .catch((err)=> console.log(err))
    

         dispatch(addPost(_post))
         history.push('/')
    }

}


const edit_Post = (post, post_Id) =>{
    return function(dispatch, getState, {history}){
    
        console.log(post)
        dispatch(editPost({...post},post_Id))
        history.replace('/')
    }
}

const set_Mypage = (list) =>{
    return async function(dispatch, getState, {history}){
        const res = await axios.get('https://03556368-8df5-49f4-bdfe-0643dfec0053.mock.pstmn.io/api/mypageinfo')
        .catch((err)=>{
            console.log(err)
        })
    
        console.log(res.data)
        dispatch(setMypage(res.data))
    }
}




export default handleActions({
  [SET_LIST] : (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.postlist)
  }),

  [SET_MYPAGE] : (state, action) => produce(state, (draft) => {
    draft.userInfo = {...action.payload.list}
  }), 

  [ADD_POST] : (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.post)
  }), 

  [EDIT_POST] : (state, action) => produce(state, (draft) => {
    let idx = draft.list.findIndex((p) => p.postId === action.payload.post_Id)
    draft.list[idx] = {...draft.list[idx], ...action.payload.post}
  }), 


}, initialState)

const actionsCreators ={
    setList,
    set_List,
    addPost,
    add_Post,
    edit_Post,
    set_Mypage,
    setMypage,

}

export { actionsCreators }