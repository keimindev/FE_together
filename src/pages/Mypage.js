import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {actionsCreators as postActions} from '../redux/modules/post'
import {history} from '../redux/configStore'
import UserInfo from '../components/UserInfo'

import Grid from '../elements/Grid'
import Text from '../elements/Text'
import Button from '../elements/Button'
import styled from 'styled-components'

const Mypage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(postActions.set_Mypage())
    }, [])

    const user = useSelector((state) => state.post.userInfo)

    let arr = [];
    if(user.myJoin.length >=4){
        for(let i=0; i<4; i++){
            arr.push(user.myJoin[i])
        }
    }else{
        for(let i=0; i<user.myJoin.length; i++){
            arr.push(user.myJoin[i])
        }
    }


    return (
        <>
        <MypageForm>
        <UserInfo user={user}/>
        <hr/>
        <Grid margin="30px 0;">
            <Text margin="20px 0;" bold size="1.6em;">참여리스트</Text>
            {user.myJoin.length > 4 ? (<MORE>더 보기</MORE>) : (<></>)}
            <JoinList>
            {user.myJoin.length === 0 ? (
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
                        <Text margin="10px 0;">인원 3/{el.state}</Text>
                        <Text margin="10px 0;">마감일 {el.deadline_date}</Text>
                    </ListForm>
                 </>
                )})} 
                </>
            )}
            </JoinList>
        </Grid>
        <Grid margin="30px 0;">
            <Text margin="20px 0;" bold size="1.6em;">내가 쓴 글</Text>
            {user.myPost.map((el, i) => {
                return(
                    <>
                    <MyPostForm key={i}>
                    <Grid is_flex>
                        <h5>{i + 1}</h5>
                        <Text>{el.title}</Text>
                        <Grid width="330px;" is_flex>
                            <span>현재 인원</span>
                            <div>{el.currentState}/{el.state}</div>
                            <Button width="60px;" margin="0 5px;" _onClick={() => history.push(`/write/${el.postId}`)} >수정</Button>
                            <Button width="60px;" _onClick={() => {
                                dispatch(postActions.del_MyPost(el.postId))
                            }}>삭제</Button>
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
padding: 0 20px;

hr{
    margin : 40px 0;
    border: 1px solid #eee;
}

img{
    width: 150px;
    height: 150px;
    border-radius: 50%;

}
`;


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