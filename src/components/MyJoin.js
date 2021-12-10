import React , {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../config'
import { history } from '../redux/configStore'
import { actionsCreators as userActions } from '../redux/modules/user'
import { actionsCreators as postActions } from '../redux/modules/post'

import Grid from '../elements/Grid'
import Text from '../elements/Text'
import Button from '../elements/Button'
import styled from 'styled-components'

const MyJoin = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.post.userInfo)
    const userinfo = useSelector((state) => state.user.user.user)
    console.log(user, userinfo, props)
    const token = localStorage.getItem('token')

    const [myJoin, setMyJoin] = useState([])

    useEffect(() => {
        dispatch(userActions.getUserCheck())
        axiosInstance.get(`/api/mypage/join/${userinfo.userId}` , {
            headers: {
                    Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data)
            setMyJoin(res.data)
        })
        .catch((err)=>{console.log(err)})
    }, [])

    let arr = [];
    if(myJoin.length >=4){
        for(let i=0; i<4; i++){
            arr.push(myJoin[i])
        }
    }else{
        for(let i=0; i<myJoin.length; i++){
            arr.push(myJoin[i])
        }
    }

    console.log(arr, myJoin)

    return (
        <>
        <Grid margin="30px 0;">
            <Text margin="20px 0;" bold size="1.6em;">참여리스트</Text>
            {myJoin.length > 4 ? (<MORE>더 보기</MORE>) : (<></>)}
            <JoinList>
            {myJoin.length === 0 ? (
                <>
                 <EmptyBox>참여 중인 모임이 없습니다 🎈 </EmptyBox>
                </>
                ) : (
                <>
                {arr.map((el, i) => {
                return(
                 <>
                    <ListForm key={i}>
                        <Text margin="10px 0;">#{el.subject}</Text>
                        <Title>{el.title}</Title>
                        <Text margin="10px 0;">팀 리더 : {el.userName}</Text>
                        <Text margin="10px 0;">인원 {el.currentState}/{el.state}</Text>
                        <Text margin="10px 0;">마감일 {el.deadline_date}</Text>
                    </ListForm>
                 </>
                )})} 
                </>
            )}
            </JoinList>
        </Grid>
        </>
    )
}

const EmptyBox = styled.div`
width: 100%;
height: 300px;
line-height: 300px;
text-align : center;
margin: 0 auto;
border-radius: 20px;
border:1px solid #ddd;


`;

const MORE = styled.p`
width:50px;
margin: 0px 10px 20px 0;
float: right;
cursor: pointer;
  &:hover{
      font-weight: 700;
  }
`;


const JoinList = styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-gap: 10px;
`;

const Title = styled.p`
    font-size: 1.3em;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

export default MyJoin
