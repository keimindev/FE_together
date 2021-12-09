import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { history } from '../redux/configStore'
import Grid from '../elements/Grid'
import Text from '../elements/Text'
import Button from '../elements/Button'

import styled from 'styled-components'


const Header = () => {
    const [is_login, setIs_login] = useState(false)

    if(is_login){
        return(
            <>
            <HeaderForm>
                <InnerBox>            
                    <Grid is_flex>
                        <Link to="/">
                        <Logo><img src="/assets/logo.png" alt="logo" /></Logo>
                        </Link>
                        <Grid is_flex width="230px;">
                            <Button margin="0 10px;" bg="#6adeb7;">mypage</Button>
                            <Button bg="#007a59;" color="#ffffff;">Logout</Button>
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