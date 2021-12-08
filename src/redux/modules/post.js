import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from 'moment'
import {axiosInstance} from "../../config";

const SET_LIST = "SET_LIST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DEL_POST = "DEL_POST";
const EDIT_INFO = "EDIT_INFO";
const DEL_MYPOST = "DEL_MYPOST";
const SET_MYPAGE = "SET_MYPAGE";

const setList = createAction(SET_LIST, (postlist) => ({postlist}))
const addPost = createAction(ADD_POST, (post) => ({post}))
const editPost = createAction(EDIT_POST, (post, post_Id) => ({post, post_Id}))
const editInfo = createAction(EDIT_INFO, (info) => ({info}))
const delPost = createAction(DEL_POST, (post_id) => (post_id))
const delMyPost = createAction(DEL_MYPOST, (post_id) => (post_id))
const setMypage = createAction(SET_MYPAGE, (list) => ({list}))

const initialState = {
    list: [
        {postId : "1", title: "리액트 모집", subject: "react", userName:"min", content : "프론트 엔드 팀원 한 분을 모집하고 있습니다.프론트 엔드 팀원 한 분을 모집하고 있습니다.프론트 엔드 팀원 한 분을 모집하고 있습니다.프론트 엔드 팀원 한 분을 모집하고 있습니다.프론트 엔드 팀원 한 분을 모집하고 있습니다.프론트 엔드 팀원 한 분을 모집하고 있습니다. 리엑트 사용 가능 Redux 활용 경험, GIT 활용한 프로젝트 경험이 있으신 팀원을 모집합니다!", deadline_date: "2021-12-14", currentState: 1, state: 5 },
        {postId : "2", title: "node 모집", subject: "node", userName:"kei", content : "알고리즘 스터드 한 분을 모집하고 있습니다. 리엑트 사용 가능 Redux 활용 경험, GIT 활용한 프로젝트 경험이 있으신 팀원을 모집합니다!", deadline_date: "2021-12-18", currentState: 2, state: 6 },
        {postId : "3", title: "스프링 모집", subject: "spring", userName:"누누", content : "함께 스프링을 뽀갤 팀원을 모집합니다.", deadline_date: "2021-12-08", currentState: 2, state: 6 },
        {postId : "4", title: "알고리즘 공부", subject: "spring", userName:"키키", content : "함께 스프링을 뽀갤 팀원을 모집합니다.", deadline_date: "2021-12-18", currentState: 5, state: 5 },
    ],
    userInfo : {
        userInfo : 
            {password: "********",
             userId: "test@test.com",
             userName: "Min"
            },
        myPost : [
            {
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
        },
        {
            currentState: 4,
            deadline_date: "2021-12-15",
            postId: "5",
            state: 5,
            subject: "알고리즘",
            title: "알고리즘 뽀개기 함께 하실 분",
            userName: "min",
        },
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
            },            
            {currentState: 1,
                deadline_date: "2021-12-11",
                postId: "3",
                state: 5,
                subject: "react",
                title: "리액트 공부합니다",
                userName: "young"
            },
            {
                currentState: 2,
                deadline_date: "2021-12-13",
                postId: "4",
                state: 4,
                subject: "react",
                title: "사이드 프로젝트 팀원 모집",
                userName: "test2",
            },   
            {
                currentState: 2,
                deadline_date: "2021-12-13",
                postId: "5",
                state: 4,
                subject: "react",
                title: "사이드 프로젝트 팀원 모집",
                userName: "test2",
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
        // axiosInstance.get('/api/post' , )
        // .then(function(response){
        //     dispatch(setList(response.data.posts))
        // }).catch(function(error){
        //     console.log(error)
        // })
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
        
        // axiosInstance.post("/api/post", _post)
        //         .then((res) =>{
        //             console.log(res)
        //             dispatch(addPost(_post))
        //             history.push('/')
        //         })
        //         .catch((err)=> console.log(err))

        dispatch(addPost(_post))

    }

}

const get_Post = (post_id = 2) =>{
    return function(dispatch, getState, {history}){
        dispatch(setList(post_id))

    }
}

const del_Post = (post_id) => {
    return function(dispatch, getState, {history}){
        // dispatch(delPost(post_id))
        history.push('/')
    }
}

const edit_Post = (post, post_Id) =>{
    return function(dispatch, getState, {history}){
        dispatch(editPost({...post},post_Id))
        history.replace('/')
    }
}

const set_Mypage = (list) =>{
    return async function(dispatch, getState, {history}){
        // const res = await axios.get('https://03556368-8df5-49f4-bdfe-0643dfec0053.mock.pstmn.io/api/mypageinfo')
        // .catch((err)=>{
        //     console.log(err)
        // })
    
        // console.log(res.data)
        // dispatch(setMypage(res.data))
    }
}

const edit_Info = (info) =>{
  return function(dispatch, getState, {history}){
      dispatch(editInfo(info))
  }
}


const del_MyPost = (post_id) => {
    return function(dispatch, getState, {history}){
        const list = getState().post.userInfo.myPost.filter((p) => p.postId !== post_id)
        console.log(list)
        dispatch(delMyPost(post_id))
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

  [DEL_POST] : (state, action) => produce(state, (draft) => {
    draft.list = draft.list.filter((p) => p.postId !== action.payload.post_id)
  }), 

  [EDIT_INFO] : (state, action) => produce(state, (draft) => {
    draft.userInfo.userInfo = {...draft.userInfo.userInfo, ...action.payload.info}
  }),

  [DEL_MYPOST] : (state, action) => produce(state, (draft) => {
      console.log(draft.userInfo)
    draft.userInfo.myPost = draft.userInfo.myPost.filter((p) => p.postId !== action.payload.post_id)

  }), 


}, initialState)

const actionsCreators ={
    setList,
    set_List,
    add_Post,
    edit_Post,
    set_Mypage,
    setMypage,
    del_MyPost,
    edit_Info,
    get_Post,
    del_Post,
    delPost,
}

export { actionsCreators }