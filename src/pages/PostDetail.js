import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history} from '../redux/configStore'
import { actionsCreators as postActions } from '../redux/modules/post'
import {axiosInstance} from "../config";

import CommentList from '../components/CommentList'

import styled from 'styled-components'
import Grid from '../elements/Grid'
import Button from '../elements/Button'


const PostDetail = (props) => {
    const dispatch = useDispatch()
    const id = props.match.params.id;
    const [is_login, setIs_login] = useState(true)
    const [join, setJoin] = useState(false)
    // const [info, setInfo] = useState({})

    const _info = useSelector(state => state.post.list)
    const idx = _info.findIndex((el) => el.postId === id)
    const info=_info[idx]
    useEffect(() =>{
        dispatch(postActions.get_Post(id))
        // axiosInstance.get(`/api/post/${id}`, )
        // .then((res) =>{
        //     console.log(res.data)
        //     setInfo(res.data)
        // })
        // .catch((err)=> console.log(err))
    },[])


    const delBtn = () =>{
        const ok = window.confirm("게시물을 지우시겠습니까?");
        if(ok) dispatch(postActions.delPost(id))
        history.push('/')
    }

    return (
        <>
        <DetailBox>
        <Grid>
            <Title>
                <span>#{info.subject}</span>
                <span>{info.title}</span>
            </Title>
            <InnerBox>
                <Write>
                    <span>작성자</span>
                    <span>{info.userName}</span>
                </Write>
                <ContentBox>
                    {info.content}
                </ContentBox>
                <ContentInfo>
                    <span>모집 마감일</span>
                    <span>{info.deadline_date}</span>
                    <span>모집 인원</span>
                    <span>{info.currentState} / {info.state}</span>

                </ContentInfo>
                {is_login ? (
                <Btn>
                    <Button width="80px;" margin="0 10px;" _onClick={() => history.push(`/write/2`)}>수정</Button>
                    <Button width="80px;" _onClick={() => delBtn()}>삭제</Button>
                </Btn>
                ) : (
                <Btn><Button width="160px;" margin="0 10px;" _onClick={() => setJoin(true)}>스터디 참여하기 👍🏻</Button></Btn>
                )}
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
padding: 0 20px;
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
    background-color:  #31ac87;
    border-radius: 20px;
    color: #fff;
}


span:nth-child(2){
    padding: 8px 0px;
}
`;


const Write = styled.div`
float:right;
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
    background-color:  #31ac87;
    border-radius: 20px;
    color: #fff;
}

span:nth-child(2),
span:nth-child(4){
   margin-right: 20px;
}
`;

const ContentInfo = styled.div`
width: 400px;
margin-bottom: 10px;
`;

const Btn = styled.div`
width: 200px;

position:absolute;
right: 10px;
bottom: 20px;

button{
    &:hover{
    transition: all 0.5s;
    background-color: #00c472;
    background-color: #007a59; 
    color: #fff;
}
}

`;


const ContentBox = styled.div`
height: 400px;
max-height: 400px;
box-sizing: border-box;
padding: 50px 20px;
`;



export default PostDetail
