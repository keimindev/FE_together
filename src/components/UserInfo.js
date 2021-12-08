import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionsCreators as postActions } from '../redux/modules/post'
import Grid from '../elements/Grid'
import Button from '../elements/Button'
import styled from 'styled-components'

const UserInfo = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.post.userInfo)
    const [username, setUsername] = useState(user.userInfo.userName)
    const [pw, setPw] = useState()
    const [pwCheck, setPwCheck] = useState()
    const [edit, setEdit] = useState(false)

    //eidt
    const post_id = props.id
    const is_edit = post_id ? true : false
    // let userInfo = is_edit ? user.find((u) => u.userName === post_id) : null
    

    const editinfo = () => {
        if(!username || !pw || !pwCheck){
            window.alert("빈 공간을 채워주세요😉");
            return;
        }

        if(pw !== pwCheck){
            window.alert("비밀번호가 일치 하지 않습니다!😊");
            return;
        }
        dispatch(postActions.edit_Info({ userName: username , password: pw}))
        setEdit(false)
    }
    
    
    return (
        <>
        <Grid is_flex bg="#007a59;"  padding="30px 50px 30px 100px;">
            <Grid width="200px;" margin="0 80px 0 0;">
                <img src="https://i.pinimg.com/736x/ea/d0/cf/ead0cfdafd20f0409792f8911cacda76.jpg" alt="profile" />
            </Grid>

            {edit ? (
                <>
                <UserInfoBox>
                    <ul>
                        <li>닉네임</li>
                        <li><input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></li>
                    </ul>
                    <ul>
                        <li>아이디</li>
                        <li>{user.userInfo.userId}</li>
                    </ul>
                    <ul>
                        <li>비밀번호</li>
                        <li><input type="password" value={pw} onChange={(e) => setPw(e.target.value)}/></li>
                    </ul>
                    <ul>
                        <li>비밀번호 확인</li>
                        <li><input type="password" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} /></li>
                    </ul>
                    <Btn><Button width="100px;" _onClick={editinfo}>완료</Button></Btn>
                </UserInfoBox>
                </>
            ) : (
                <>
                    <UserInfoBox>
                    <ul>
                        <li>닉네임</li>
                        <li>{user.userInfo.userName}</li>
                    </ul>
                    <ul>
                        <li>아이디</li>
                        <li>{user.userInfo.userId}</li>
                    </ul>
                    <Btn><Button width="100px;" _onClick={()=> setEdit(true)}>수정</Button></Btn>
                </UserInfoBox>
                </>
            ) }
        </Grid>            
        </>
    )
}

const UserInfoBox = styled.div`
width: 100%;

input{
    width: 130px;
    padding: 0px 5px;
    border: 0;
    background-color: transparent;
    border-bottom: 2px solid #31ac87;
    outline: 0;
    color:  #fff;
}

ul{
    display: flex;
    margin: 15px 0;

    li{
        list-style: none;
        padding: 13px 5px;
        color: #fff;
    }

    li:nth-child(1){
        width: 110px;
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


export default UserInfo
