import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Post from '../components/Post'
import Button from '../elements/Button'
import Grid from '../elements/Grid'

const PostList = () => {
  const history = useHistory()
  const moveToPage = () =>{
     history.push('/write')
  }

    return (
        <>
        <List>
          <Grid is_flex>
              <Button width="100px;" _onClick={moveToPage}>모집하기</Button>
              <Grid is_flex width="420px;">
              <Button width="100px;">ALL</Button>
              <Button width="100px;">#React.js</Button>
              <Button width="100px;">#Node.js</Button>
              <Button width="100px;">#Spring</Button>
              </Grid>
          </Grid>
          <Post/>
        </List>
        </>
    )
}

const List = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0 auto;

button{
  transition: all 0.5s ease;
  &:hover{
    background-color: #31a552;
    color: #fff;
  }
}
`

export default PostList