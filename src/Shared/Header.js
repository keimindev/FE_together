import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionsCreators as userActions } from '../redux/modules/user'
import { history } from '../redux/configStore'
import Grid from '../elements/Grid'
import Button from '../elements/Button'

import styled from 'styled-components'


const Header = () => {
    const dispatch = useDispatch()
    const is_session = localStorage.getItem('token') ? true : false
    const user = useSelector((state) => state.user.user.user)
    // console.log(user.userId)

    useEffect(()=>{
        dispatch(userActions.getUserCheck())
    },[])

    const logout_ = () => {
        localStorage.removeItem('token')
        window.location.href="/"
    }
    const goTomypage = () => {
        history.push(`/page/${user.userId}`)
    }

    if(is_session){
        return(
            <>
            <HeaderForm>
                <InnerBox>            
                    <Grid is_flex>
                        <Link to="/">
                        <Logo><img src="/assets/logo.png" alt="logo" /></Logo>
                        </Link>
                        <Grid is_flex width="230px;">
                            <Button margin="0 10px;" bg="#6adeb7;" _onClick={goTomypage}>mypage</Button>
                            <Button bg="#007a59;" color="#ffffff;" _onClick={logout_}>Logout</Button>
                        </Grid>
                </Grid>
                </InnerBox>
            </HeaderForm>
            </>
        )
    }
    return (
        <>
        <HeaderForm>
            <InnerBox>            
                <Grid is_flex>
                    <Link to="/">
                    <Logo><img src="/assets/logo.png" alt="logo" /></Logo>
                    </Link>
                    <Grid is_flex width="230px;">
                        <Button margin="0 10px;" bg="#6adeb7;" _onClick={() => history.push('/login')}>Login</Button>
                        <Button bg="#007a59;" color="#ffffff;" _onClick={() => history.push('/signup')}>Sign up</Button>
                    </Grid>
            </Grid>
            </InnerBox>
        </HeaderForm>
        </>
    )
}


const HeaderForm = styled.div`
background-color: #31ac87;
padding: 0px 20px;
margin-bottom: 80px;
height: 150px;
color: #ffffff;
`;

const InnerBox = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0 auto;
`;
 
const Logo = styled.div`
width: 200px;


img{
    width: 100%;
}
`;


export default Header