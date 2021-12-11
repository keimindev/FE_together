import React, { useState } from 'react';
import '../Shared/exam.css';
import ExamSignup from '../components/LoginForm';

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src="assets/logo1.png" alt="logo" />
        </div>
        {!isSubmitted ? <ExamSignup submitForm={submitForm} /> : <></>}
      </div>
    </>
  );
};

export default Login;
