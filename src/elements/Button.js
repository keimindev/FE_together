import React from 'react'

const Button = (props) => {
    const { margin, padding, bg, bold, children, _onClick, text, width, cursor, disabled} = props
    const styles = {
        margin: margin,
        padding: padding,
        bg: bg,
        bold: bold,
        width: width,
        cursor: cursor,
        disabled:disabled,
    
    }

    return (
        <>
        <button {...styles} onClick={_onClick}>{text? text : children}</button>
        </>
    )
}


Button.defaultProps = {
    children: null,
    margin: false,
    width: '100%',
    color: false,
    bg : false,
    bold: false,
    text: false,
    _onClick: () => {},
    cursor: "pointer",

}


export default Button