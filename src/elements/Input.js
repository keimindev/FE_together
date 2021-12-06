import React from 'react'


const Input = (props) => {
    const {label, placeholder, _onChange, type } = props;
    return(
    <>
        <p>{label}</p>
        <input type={type} placeholder={placeholder} onChange={_onChange}/> 
     </>
    )

}

Input.defaultProps = {
    label: "텍스트",
    placeholder: "텍스트를 입력해주세요.",
    type: "text",
    _onChange: () => {},
}

export default Input
