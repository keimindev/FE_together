import React, {useEffect, useState} from 'react'
import { useSelector,  useDispatch } from 'react-redux'
import { axiosInstance } from '../config'
import { actionsCreators as postActions } from '../redux/modules/post'
import Header from '../Shared/Header'
import Post from '../components/Post'
import Button from '../elements/Button'
import Grid from '../elements/Grid'

import styled from 'styled-components'


const PostList = (props) => {
  const dispatch = useDispatch()
  const moveToPage = () =>{
     history.push('/write')
  }

  const {history} = props;
  const [post_list, setPost_List] = useState([])
  
  useEffect(() => {
    axiosInstance.get('/api/post' , )
    .then(function(response){
        setPost_List(response.data.posts)
    }).catch(function(error){
        console.log(error)
    })
 }, [])

    return (
        <>
        <Header/>
        <List>
          <Grid is_flex margin="0 0 40px 0;">
              <Button width="100px;" _onClick={moveToPage}>모집하기</Button>
          </Grid>
          
          {post_list.map((p,i) => {
            return(
              <>
              <Grid key={i} _onClick={() => history.push(`/detail/${p.postId}`)}>
                <Post key={i} {...p}/>
              </Grid>
              </>
            )

          })}
        </List>
        </>
    )
}

const List = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0 auto;
padding: 0 20px;

button{
  transition: all 0.5s ease;
  &:hover{
    background-color: #007a59;
    color: #fff;
  }
}
`

export default PostList