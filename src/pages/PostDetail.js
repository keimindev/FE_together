import React from 'react'
import CommentList from '../components/CommentList'

import styled from 'styled-components'
import Grid from '../elements/Grid'
import Button from '../elements/Button'


const PostDetail = () => {
    return (
        <>
        <DetailBox>
        <Grid>
            <Title>
                <span>#React.js</span>
                <span>타이틀자리입니다</span>
            </Title>
            <InnerBox>
                <ContentInfo>
                    <span>모집 마감일</span>
                    <span>2021-12-19</span>
                    <span>모집 인원</span>
                    <span>1 / 5</span>
                </ContentInfo>
                <ContentBox>
                    컨텐츠 자리입니다
                </ContentBox>
                <Btn>
                    <Button width="80px;" margin="0 10px;">수정</Button>
                    <Button width="80px;">삭제</Button>
                </Btn>
            </InnerBox>
        </Grid>
        <CommentList/>
        </DetailBox>
        </>
    )
}

const DetailBox = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0 auto;
`;

const Title = styled.p`
font-size: 1.3em;
font-weight: bold;
padding: 20px 20px;
margin: 10px 0;
border-radius: 30px;
border: 1px solid #ddd;

display: flex;


span:nth-child(1){
    font-size: 0.8em;
    font-weight: normal;
    margin-right: 20px;
    padding: 9px 15px;
    background-color: #31a552;;
    border-radius: 20px;
    color: #fff;
}


span:nth-child(2){
    padding: 8px 0px;
}
`;

const InnerBox = styled.div`
border: 1px solid #ddd;
padding: 20px 20px;
margin: 10px 0;
border-radius: 30px;

position:relative;

span:nth-child(1),
span:nth-child(3){
    font-size: 0.8em;
    font-weight: normal;
    padding: 9px 15px;
    margin-right: 10px;
    background-color: #31a552;;
    border-radius: 20px;
    color: #fff;
}

span:nth-child(2),
span:nth-child(4){
   margin-right: 20px;
}
`;

const ContentInfo = styled.div`
width: 380px;
float: right;
`;

const Btn = styled.div`
width: 200px;

position:absolute;
right: 10px;
bottom: 20px;
`;


const ContentBox = styled.div`
height: 400px;
max-height: 400px;
box-sizing: border-box;
padding: 50px 20px;
`;



export default PostDetail
