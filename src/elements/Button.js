import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
    const { margin, padding, bg, bold, children, _onClick, text, width, cursor, disabled, color} = props
    const styles = {
        margin: margin,
        padding: padding,
        bg: bg,
        bold: bold,
        width: width,
        cursor: cursor,
        disabled:disabled,
        color: color,
    
    }

    return (
        <>
        <Btn {...styles} onClick={_onClick}>{text? text : children}</Btn>
        </>
    )
}


Button.defaultProps = {
    children: null,
    margin: false,
    width: '100%',
    color: "#222222;",
    bg : false,
    bold: false,
    text: false,
    _onClick: () => {},
    cursor: "pointer",

}


const Btn = styled.button`
    width: ${(props) => props.width};
    height: 40px;
    border-radius: 10px;
    padding: 0.5em 1em;
    color: ${(props) => props.color};
    ${(props) => props.margin ? `margin: ${props.margin}`: ''}
    ${(props) => props.bg ? `background-color: ${props.bg}`: ''}
    font-weight: ${(props) => (props.bold ? "700" : "400")};



    border: 0;
    outline: 0;
    cursor: pointer;
`;

export default Button