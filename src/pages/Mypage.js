import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {actionsCreators as postActions} from '../redux/modules/post'
import axios from 'axios'

import Grid from '../elements/Grid'
import Text from '../elements/Text'
import Button from '../elements/Button'
import styled from 'styled-components'

const Mypage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.set_Mypage())
    }, [])

    const user = useSelector((state) => state.post.userInfo)

    return (
        <>
        <MypageForm>
        <Grid is_flex bg="#00c472;"  padding="30px 50px 30px 100px;">
            <Grid width="200px;" margin="0 80px 0 0;">
                <img src="https://i.pinimg.com/736x/ea/d0/cf/ead0cfdafd20f0409792f8911cacda76.jpg" alt="profile" />
            </Grid>
            <UserInfo>
                <ul>
                    <li>닉네임</li>
                    <li>{user.userInfo[0].userName}</li>
                </ul>
                <ul>
                    <li>아이디</li>
                    <li>{user.userInfo[0].userId}</li>
                </ul>
                <ul>
                    <li>비밀번호</li>
                    <li>{user.userInfo[0].password}</li>
                </ul>
                <Btn><Button width="100px;">수정</Button></Btn>
            </UserInfo>
        </Grid>
        <Grid margin="30px 0;">
            <Text margin="20px 0;"><h2>참여리스트</h2></Text>
            <JoinList>
            {user.myJoin.map((el) => {
                return(
                 <>
                    <ListForm>
                        <Text margin="10px 0;">#{el.subject}</Text>
                        <Text margin="10px 0;"><h3>{el.title}</h3></Text>
                        <Text margin="10px 0;">팀 리더 : {el.userName}</Text>
                        <Text margin="10px 0;">인원 3/{el.state}</Text>
                        <Text margin="10px 0;">마감일 {el.deadline_date}</Text>
                    </ListForm>
                    </>
                )})}
            </JoinList>
        </Grid>
        <Grid margin="30px 0;">
            <Text margin="20px 0;"><h2>내가 쓴 글</h2></Text>
            {user.myPost.map((el, i) => {
                return(
                    <>
                    <MyPostForm>
                    <Grid is_flex>
                        <h5>{i + 1}</h5>
                        <Text>{el.title}</Text>
                        <Grid width="220px;" is_flex>
                            <div>1/{el.state}</div>
                            <Button width="60px;" margin="0 5px;">수정</Button>
                            <Button width="60px;">삭제</Button>
                        </Grid>
                    </Grid>
                    </MyPostForm>
                    </>
                )
            })}
        </Grid>
        </MypageForm>
        </>
    )
}

const MypageForm =styled.div` 
max-width: 980px;
min-width: 400px;
margin: 0 auto;

img{
    width: 150px;
    height: 150px;
    border-radius: 50%;

}
`
const UserInfo = styled.div`
width: 100%;

ul{
    display: flex;
    margin: 15px 0;

    li{
        list-style: none;
        padding: 10px 5px;
        color: #fff;
    }

    li:nth-child(1){
        width: 80px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: rgba(255,255,255,0.7);
        text-align: center;
        color: #222;
    }
}
`;
const Btn =styled.div`
float: right;
`;


const JoinList = styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(4, 1fr);

`;

const ListForm = styled.div`
width: 230px;
height: 240px;
overflow-y: hidden;
padding: 20px 20px;
border: 1px solid #ddd;
border-radius: 20px;
cursor: pointer;
transition: all 0.5s ease;

&:hover{
    background-color: #e8f5ee;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
`;


const MyPostForm = styled.div`
border-bottom: 1px solid #ddd;
padding: 5px 0;

h5{
    width: 30px;
    padding: 5px 0;
    text-align: center;
    background-color: #31a552;
    color: #fff;
    margin-right: 10px;
}

button{
    &:hover{
    transition: all 0.5s ease;
    background-color: #31a552;
    color: #fff;

}
}


`;


export default Mypage