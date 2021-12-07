import React, {useState} from 'react'
import Grid from '../elements/Grid'
import Text from '../elements/Text'
import Button from '../elements/Button'

import styled from 'styled-components'


const Header = () => {
    const [is_login, setIs_login] = useState(true)

    if(is_login){
        return(
            <>
            <HeaderForm>
                <InnerBox>            
                    <Grid is_flex>
                        <Text>Together</Text>
                        <Grid is_flex width="230px;">
                            <Button margin="0 10px;" bg="#00c472;" color="#ffffff;">mypage</Button>
                            <Button bg="#31a552;" color="#ffffff;">Logout</Button>
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
                    <Text>Together</Text>
                    <Grid is_flex width="230px;">
                        <Button margin="0 10px;" bg="#00c472;" color="#ffffff;">Login</Button>
                        <Button bg="#31a552;" color="#ffffff;">Sign up</Button>
                    </Grid>
            </Grid>
            </InnerBox>
        </HeaderForm>
        </>
    )
}


const HeaderForm = styled.div`
/* background-color: #38ce91; */
padding: 20px 0;
height: 150px;
color: #ffffff;
`;

const InnerBox = styled.div`
max-width: 980px;
min-width: 400px;

margin: 0 auto;
`;


export default Header