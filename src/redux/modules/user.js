
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import 'moment';
import {history} from '../configStore'
import { TokenToCookie, Logout } from '../../Shared/Cookies';
import Cookies from 'universal-cookie';
import {axiosInstance } from '../../config';
import { setCookie, deleteCookie, getCookie } from '../../Shared/Cookies';
// import {history} from '../configureStore';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SIGN_UP = 'SIGN_UP';
const ON_LOGIN = 'ON_LOGIN';

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
const Onlogin = createAction(ON_LOGIN, (accountId, nickname, id, token) => ({
  accountId,
  nickname,
  id,
  token,
}));

const initialState = {
  accountId: '',
  nickname: '',
  id: '',
  token: '',
};
const loginDB = (id, pwd) => {
  return function (dispatch, { history }) {
    console.log(id, pwd);
    axiosInstance.post('/api/login', {
        accountId: id,
        password: pwd,
      })
      .then(function (response) {
        const accessToken = response.data.token.replace('"', '');
        const accountId = response.data.user.accountId;
        const nickname = response.data.user.nickname;
        const id = response.data.user.id;
        TokenToCookie(accessToken);
        dispatch(Onlogin(accountId, nickname, id, accessToken));
        window.alert('로그인 성공: 환영합니다! :)');
      })
      .catch(function (error) {
        console.log(`로그인 오류 발생: ${error}`);
      });
  };
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

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = { ...action.payload };
      }),
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        draft.list = { ...action.payload };
      }),
    [ON_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.accountId = action.payload.accountId;
        draft.nickname = action.payload.nickname;
        draft.id = action.payload.id;
        draft.token = action.payload.accessToken;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
      }),
  },
  initialState
);

const actionCreators = {
  logIn,
  loginDB,
  Onlogin,
  signUpDB,
};

export { actionCreators };
