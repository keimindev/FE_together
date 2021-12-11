import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionsCreators as userActions } from '../redux/modules/user'
import Grid from '../elements/Grid'
import Button from '../elements/Button'
import styled from 'styled-components'

const UserInfo = (props) => {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.user.user)
    const [username, setUsername] = useState(props.userinfo.userName)
    const [pw, setPw] = useState()
    const [pwCheck, setPwCheck] = useState()
    const [edit, setEdit] = useState(false)
    
    //eidt
    const post_id = props.id
    const is_edit = post_id ? true : false
    // let userInfo = is_edit ? user.find((u) => u.userName === post_id) : null
    
    useEffect(() =>{
        dispatch(userActions.getUserCheck())
   },[])

    const editinfo = () => {
        if(!username || !pw || !pwCheck){
            window.alert("빈 공간을 채워주세요😉");
            return;
        }

        if(pw !== pwCheck){
            window.alert("비밀번호가 일치 하지 않습니다!😊");
            return;
        }
        dispatch(userActions.modifyUserInfo({ userName: username , password: pw, passwordConfirm: pwCheck}, props.userinfo.userId))
        setEdit(false)
    
    }
    

    const profile = props.userinfo.userName.split('')[0]
    
    return (
        <>
        <Grid is_flex bg="#007a59;"  padding="30px 50px 30px 50px;">
            <Grid width="200px;" margin="0 20px 0px 20px;">
                <Profile>{profile}</Profile>
            </Grid>

            {edit ? (
                <>
                <UserInfoBox>
                    <Inner>
                    <ul>
                        <li>닉네임</li>
                        <li><input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></li>
                    </ul>
                    <ul>
                        <li>아이디</li>
                        <li>{props.userinfo.userEmail}</li>
                    </ul>
                    </Inner>
                    <Inner>
                    <ul>
                        <li>비밀번호</li>
                        <li><input type="password" value={pw} onChange={(e) => setPw(e.target.value)}/></li>
                    </ul>
                    <ul>
                        <li>비밀번호 확인</li>
                        <li><input type="password" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} /></li>
                    </ul>
                    </Inner>
                    <Btn><Button width="80px;" _onClick={editinfo}>완료</Button></Btn>
                </UserInfoBox>
                </>
            ) : (
                <>
                    <UserInfoBox>
                        <Inner>
                            <ul>
                                <li>닉네임</li>
                                <li>{props.userinfo.userName}</li>
                            </ul>
                            <ul>
                                <li>아이디</li>
                                <li>{props.userinfo.userEmail}</li>
                            </ul>
                    </Inner>
                    <Btn><Button width="80px;" _onClick={()=> setEdit(true)}>수정</Button></Btn>
                </UserInfoBox>
                </>
            ) }
        </Grid>            
        </>
    )
}

const UserInfoBox = styled.div`
width: 100%;
display: flex;

position: relative;

input{
    width: 120px;
    padding: 0px 5px;
    border: 0;
    background-color: transparent;
    border-bottom: 2px solid #31ac87;
    outline: 0;
    color:  #fff;
}

ul{
    margin: 15px 0;

    li{
        list-style: none;
        padding: 10px 5px;
        color: #fff;
    }

    li:nth-child(1){
        width: 110px;
        height: 40px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: rgba(255,255,255,0.7);
        text-align: center;
        color: #222;
    }

    li:nth-child(2){
        width: 150px;
        height: 60px;
        margin-right: 10px;

        input{
            height: 100%;
        }
    }

}
`;

const Inner = styled.div`
width: 50%;
`;


const Profile = styled.div`
width: 100px;
height: 100px;
border-radius: 50%;
background-color: #fff;
text-align: center;
line-height: 100px;
font-size: 50px;
font-weight: bold;
`;


const Btn =styled.div`
position: absolute;
top: 0px;
right: -15px;

`;


export default UserInfo
