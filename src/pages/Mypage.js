import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {actionsCreators as postActions} from '../redux/modules/post'
import {actionsCreators as userActions} from '../redux/modules/user'
import {history} from '../redux/configStore'
import { axiosInstance } from '../config'
import UserInfo from '../components/UserInfo'

import Header from '../Shared/Header'
import styled from 'styled-components'
import MyPost from '../components/MyPost'
import MyJoin from '../components/MyJoin'

const Mypage = () => {
    const userinfo = useSelector((state) => state.user.user.user)

    return (
        <>
        <Header userinfo={userinfo}/>
        <MypageForm>
        <UserInfo userinfo={userinfo}/>
        <hr/>
        <MyJoin userinfo={userinfo}/>
        <MyPost userinfo={userinfo}/>
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





export default Mypage