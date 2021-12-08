import React, {useState, useEffect} from 'react'
import { useSelector,  useDispatch } from 'react-redux'


import {actionsCreators as postActions} from '../redux/modules/post'
import styled from 'styled-components'
import Grid from '../elements/Grid'
import Text from '../elements/Text'


function Post(props) {
    const dispatch = useDispatch()
    const post_list = useSelector((state) => state.post.list)

    useEffect(() => {
       dispatch(postActions.set_List())
    }, [])

    return (
        <>
        {post_list.map((p, idx) => {
            const setDate = new Date(p.deadline_date)
            const today = new Date()
            let distance = setDate.getTime() - today.getTime()
            let gap = Math.ceil(distance / (1000 * 60 * 60 * 24))

            return(
                <>
                <PostForm key={idx}>
                <Grid is_flex>
                    <Grid margin="30px 0 0 0;">
                    {gap === 0 || p.state === p.currentState ? (
                         <span className="dday endday">#모집마감</span>
                    ) : (
                         <span className="dday">D-{gap}</span>
                    )}
                   
                    <Text margin="15px 0 15px 0;" size="1.3em;" bold>{p.title}</Text>
                    <Content>{p.content}</Content>
                    </Grid>
                    <InnerBox>
                        <Text margin="10px 0 0 0;" color="#fff;">Team Leader : {p.userName}</Text>
                        <Text margin="10px 0 0 0" color="#fff;">모집인원 : {p.currentState}/{p.state}</Text>
                        <Text margin="10px 0 0 0" color="#fff;">마감일 : {p.deadline_date}</Text>
                        <Grid margin="20px 0 0 0 " width="200px;">
                            <span className="tag">#{p.subject}</span>
                        </Grid>
                    </InnerBox>
                </Grid>  
                </PostForm>
                </>
            )
        })}
        </>
    )
}

const PostForm = styled.div`
border : 1px solid #aaa;
border-radius: 15px;

height: 200px;
max-height: 200px;
padding: 0px 0px 0px 20px;
margin: 20px 0;
transition: all .5s ease;
cursor: pointer;

span{
    border-radius: 10px;
    background-color: #e8f5ee;
    /* background-color:#00c472;  */
    /* color: #fff; */
    padding: 5px 10px;
    margin-right: 5px;
 
}

.dday{
    font-size: 24px;
    font-weight: bold; 
}

.endday{
    background-color: #e8f5ee;
    color: #fff;
}

.tag{
    background-color: #e3f7ee;
    color: green;
}


 &:hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

`;

const Content = styled.p`
    width: 97%;
    padding-top: 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; 
`;

const InnerBox=styled.div`
    width:30%;
    height: 200px;
    max-height: 200px;
    background-color:${(props) => props.gap === 0 ? "#222;" : "#00c472;" };
    padding:25px 10px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    &:hover{
        background-color: #31a552;
    }
`

export default Post
