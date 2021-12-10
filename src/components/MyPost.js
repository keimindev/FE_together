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

const MyPost = (props) => {
    const dispatch = useDispatch()
    const [myPost, setMyPost] = useState([])
    const userInfo = useSelector((state) => state.user.user.user)
    const id = userInfo.userId
    const token = localStorage.getItem('token')

    console.log(id)

    useEffect(() => {
        axiosInstance.get(`/api/mypage/posts/${id}` , {
            headers: {
                 Authorization: `Bearer ${token}`,
           },
        })
        .then((res) => {
            console.log(res.data.mypost)
            setMyPost(res.data.mypost)
        })
        .catch((err)=>{console.log(err)})
    }, [])

    return (
        <>
        <Grid margin="30px 0;">
            <Text margin="20px 0;" bold size="1.6em;">내가 쓴 글</Text>
            {myPost.map((el, i) => {
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
                                dispatch(postActions.del_MyPost(id, el.postId))
                            }}>삭제</Button>
                        </Grid>
                    </Grid>
                    </MyPostForm>
                    </>
                )
            })}
        </Grid>
        </>
    )
}

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


export default MyPost
