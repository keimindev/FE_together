import React from 'react'
import Comment from './Comment'

import styled from 'styled-components'

const CommentList = () => {
    return (
        <>
        <ComList>
            <Comment/>
        </ComList>
        </>
    )
}

const ComList = styled.div`
margin: 20px 0 100px 0px;
`;

export default CommentList
