import React, { useState } from 'react';
import { history } from '../redux/configStore';
import emailCheck from '../Shared/EmailCheck';
import useForm from '../components/useForm';
import '../Shared/exam.css';
import { actionsCreators } from '../redux/modules/user';
import { useDispatch } from 'react-redux';

const SignupForm = ({ submitForm }) => {
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, errors } = useForm(
    submitForm,
    emailCheck
  );

  //별명입력
  const [user_nickname, setNickname] = useState('');

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };
  //이메일
  const [user_email, setEmail] = useState('');
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  //비밀번호
  const [user_pwd, setPwd] = useState('');
  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  //비밀번호 확인
  const [user_pwdcheck, setPwdcheck] = useState('');
  const changePwdcheck = (e) => {
    setPwdcheck(e.target.value);
  };

  //이메일입력

  const signup = () => {
    if(user_email ===""|| user_pwd ==="" || user_nickname === "" || user_pwdcheck === ""){
      window.alert("아이디 혹은 비밀번호가 공란입니다. 채워주세요");
      return ;
  }

    if(!emailCheck(user_email)){
        window.alert("이메일 형식이 맞지 않습니다");
        return ;
    }

    dispatch(
      actionsCreators.signUpDB(
        user_email,
        user_nickname,
        user_pwd,
        user_pwdcheck
      )
    );
  };

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-inputs">
          <label className="form-label">Nickname</label>
          <input
            className="form-input"
            type="nickname"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            value={user_nickname}
            onChange={(handleChange, changeNickname)}
          />
          {errors.nickname && <p>{errors.nickname}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={user_email}
            onChange={(handleChange, changeEmail)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={user_pwd}
            onChange={(handleChange, changePwd)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="비밀번호재확인"
            value={user_pwdcheck}
            onChange={(handleChange, changePwdcheck)}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button onClick={signup} className="form-input-btn" type="button">
          회원가입
        </button>
        <span className="form-input-login">
          이미계정이 있나요? <a href="login">로그인</a>
        </span>
      </form>
    </div>
  );
};

export default SignupForm;
