import React, {useState} from 'react';
import emailCheck from '../Shared/EmailCheck';
import useForm from './useForm';
import { TokenToCookie } from '../Shared/Cookies';
import { history } from '../redux/configStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { axiosInstance } from '../config';

const ExamSignup = ({ submitForm }) => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm(
    submitForm,
    emailCheck
  );

  const [user_email, setUser_email] = useState()
  const [user_pwd, setUser_pwd] = useState()

  const login = () => {
      if(user_email ==="" || user_pwd ===""){
        window.alert("아이디 혹은 비밀번호가 공란입니다. 채워주세요");
        return ;
    }

      if(!emailCheck(user_email)){
          window.alert("이메일 형식이 맞지 않습니다");
          return ;
      }

      axiosInstance.post('/api/login', {
        userEmail: user_email,
        password: user_pwd,
      }).then((response) => {
        console.log(response)
        const accessToken = response.data.token
        TokenToCookie(accessToken);
        localStorage.setItem("token", accessToken)
        window.location.href="/"
      }).catch((error) => {
        console.log(error)
      });
    
  };

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={user_email}
            onChange={(e) => setUser_email(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={user_pwd}
            onChange={(e) => setUser_pwd(e.target.value)}
          />
        </div>

        <button onClick={login} className="form-input-btn" type="button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default ExamSignup;
