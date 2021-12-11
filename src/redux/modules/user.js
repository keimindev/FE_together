import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import 'moment';
import {history} from '../configStore'
import {axiosInstance } from '../../config';
import { setCookie, deleteCookie } from '../../Shared/Cookies';

const token = localStorage.getItem('token')
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SIGN_UP = 'SIGN_UP';
const GET_USER = 'GET_USER';
const EDIT_USERINFO = 'EDIT_USERINFO';

const logIn = createAction(LOG_IN, (accountId, nickname, id, token) => ({
  accountId,
  nickname,
  id,
  token,
}));
const signUp = createAction(SIGN_UP, (id, email, nickname, password) => ({
  nickname,
  id,
  email,
  password,
}));


const getUser = createAction(GET_USER, (user) => ({user}))
const logout = createAction(LOG_OUT, (user) => ({user}));
const editUserInfo = createAction(EDIT_USERINFO, (user, userid) => ({user, userid}))

const initialState = {
  user: {
    userEmail : "",
    userId : 1,
    userName: "",
}

};


const signUpDB = (id, nickname, pwd, pwdcheck) => {
  return function (dispatch) {
    axiosInstance.post(`/api/register`, {
        userEmail: id,
        userName: nickname,
        password: pwd,
        passwordConfirm: pwdcheck,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(signUp(id, nickname, pwd));
        window.alert('가입을 축하드려요!');
        history.push('/login')
      })
      .catch((err) => {
        console.log(`회원가입 오류 발생: ${err}`);
      });
  };
};


const log_Out = () => {
  return function(dispatch, getState, {history}){
    dispatch(logout())
    history.replace('/')
  }
}

const getUserCheck = () =>{
  return function (dispatch, getState, {history}){
    axiosInstance.get(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  })
    .then((res) => {
    dispatch(getUser(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


const modifyUserInfo = (user, userid) =>{
  return function (dispatch, getState, {history}){
    axiosInstance.patch(`/api/mypage/${userid}`,{
      userName : user.userName,
      password : user.password,
      passwordConfirm : user.passwordConfirm
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      dispatch(editUserInfo(res))
    }).catch((err) => {
      console.log("이미 사용하고 있는 닉네임입니다")
      console.log(err)
    })
  }
}



//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success")
        draft.list = { ...action.payload };
      }),
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        draft.list = { ...action.payload };
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        console.log(action.payload);
      }),

      [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
      }),
  },
  initialState
);

const actionsCreators = {
  logIn,
  signUpDB,
  log_Out,
  getUserCheck,
  modifyUserInfo,
};

export { actionsCreators };
