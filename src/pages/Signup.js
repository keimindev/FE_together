import React, { useState } from 'react';
import '../Shared/exam.css';
import SignupForm from '../components/SignupForm';

const Signup = () => {
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
        {!isSubmitted ? <SignupForm submitForm={submitForm} /> : <></>}
      </div>
    </>
  );
};

export default Signup;
