import React from 'react'

import Grid from './Grid';
import Text from './Text';

import styled from 'styled-components';

const Input = (props) => {
    const {label, placeholder, _onChange, type, textarea, value } = props;

    if(textarea){
        return(
            <Grid>
                <TextArea 
                row={50} 
                placeholder={placeholder} 
                onChange={_onChange} 
                value={value}
                ></TextArea>
            </Grid>
        )
    }    
    return(
    <>
    <InputForm>
        <Text>{label}</Text>
        <input type={type} placeholder={placeholder} onChange={_onChange} value={value} /> 
    </InputForm>
     </>
    )

}

Input.defaultProps = {
    label: "텍스트",
    placeholder: "텍스트를 입력해주세요.",
    type: "text",
    _onChange: () => {},
    textarea: false,
    value: "",
}

const InputForm = styled.div`
margin: 15px 0;
 input{
    padding: 10px 10px;
    width: 100%;
    border: 1px solid #ddd;
    outline: none;
    font-family: 'NanumSquareRound';

 }
`

const TextArea = styled.textarea`
    width: 100%;
    height: 400px;
    max-height: 400px;
    padding: 2em 2em;
    margin: 1em 0;
    box-sizing: border-box;
    border: 1px solid #ddd;
    outline: 0;
    font-family: 'NanumSquareRound';
    border-radius: 20px;
 `;
export default Input
