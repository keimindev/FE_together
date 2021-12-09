import React, {useState} from 'react';
import emailCheck from '../Shared/EmailCheck';
import useForm from './useForm';
import { getCookie, setCookie, deleteCookie } from '../Shared/Cookies';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const ExamSignup = ({ submitForm }) => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm(
    submitForm,
    emailCheck
  );

  const [user_email, setUser_email] = useState()
  const [user_pwd, setUser_pwd] = useState()


  console.log(getCookie('user_id'));



  const login = () => {
    if(user_email ===""|| user_pwd ===""){
      window.alert("아이디 혹은 비밀번호가 공란입니다. 채워주세요");
      return ;
  }

    if(!emailCheck(user_email)){
        window.alert("이메일 형식이 맞지 않습니다");
        return ;
    }

    dispatch(userActions.loginDB(user_email, user_pwd));
  };

  console.log(user_email, user_pwd)


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
          {/* {errors.email && <p>{errors.email}</p>} */}
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
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>

        <button onClick={login} className="form-input-btn" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default ExamSignup;
