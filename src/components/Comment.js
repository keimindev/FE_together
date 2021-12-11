import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Text from '../elements/Text'
import Grid from '../elements/Grid'
import Button from '../elements/Button'

const Comment = (props) => {
  const userinfo = useSelector((state) => state.user.user.user)
  const {user_name, user_id, post_id, contents, createdAt} = props;
  const curUser = localStorage.getItem('userId')
  const [is_userid, setIs_userid] = useState(curUser === props.user_id ? true : false)
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState(props.contents ? props.contents : "")


  const editCommentStart =() =>{
    setEdit(true)
  }
  const editComment = (e) => {
    setContent(e.target.value)
    setEdit(false)
  }

    return (
        <>
        <Box key={post_id}>
          <Grid is_flex margin="10px 0;">
          <Grid is_flex width="10%;" margin="0 5px;">
                <Text bold>{user_name}</Text>
            </Grid>
            {edit && is_userid ? (
              <>
            <CommentBox>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)}  maxlength='200'/>
                <Button width="100px;" _onClick={editComment}>수정 완료</Button>
            </CommentBox>
              </>
            ) : (
              <>
              <CommentBox>
                <Text>{contents}</Text>
                <Time>{createdAt}</Time>
                {is_userid ? (
                  <>
                  <Btn>
                  <Button width="60px;" margin="0 10px;" _onClick={editCommentStart}>수정</Button>  
                  <Button width="60px;">삭제</Button>
                  </Btn>
                  </>
                ) : (<></>)}
            </CommentBox>    
              </>
            ) }

          </Grid>
          </Box>
        </>
    )
}

Comment.defaultProps = {
  user_profile: "",
  user_name: "도로마무",
  user_id: "",
  post_id: 1,
  contents: "학습 난이도가 궁금합니다! 쪼렙도 합류가능한가요? 😥",
  createdAt: '2021-01-01 19:00:00',
}



const Box = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0 auto;
border-bottom: 1px solid pink;
display: flex;
align-items: center;
`;

const CommentBox = styled.div`
display: flex;
justify-content: space-between;
width: 90%;

input{
  width: 100%;
  border: 0;
  outline: 0;
  padding: 10px 0;

}
`;

const Btn = styled.div`
width: 200px; 
display: flex;
`;

const Time = styled.div`
font-size: 0.8em;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`;

export default Comment  