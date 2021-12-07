import React , {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionsCreators as postActions } from '../redux/modules/post'
import {history} from '../redux/configStore'
import moment from 'moment'
import Grid from '../elements/Grid'
import Button from '../elements/Button'
import Input from '../elements/Input'
import Text from '../elements/Text'
import styled from 'styled-components'

const PostWrite = (props) => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.post.list)

    //eidt
    const post_id = props.match.params.id
    const is_edit = post_id ? true : false
    let postInfo = is_edit ? post.find((p) => p.postId === post_id) : null

    useEffect(() =>{
        if(is_edit && !postInfo ){
            history.goBack();
        }
    })
    
    const [title, setTitle] = useState(postInfo ? postInfo.title : ""); 
    const [content,setContent] = useState(postInfo ? postInfo.content : "");
    const [subject,setSubject] = useState();
    const [deadline,setDeadline] = useState();
    const [state,setState] = useState(postInfo ? postInfo.state : "");
    const date = moment().format("YYYY-MM-DD")

    const addpost =() =>{
        dispatch(postActions.add_Post({title: title, content: content, subject: subject, deadline: deadline, state: state}))
        //dispatch(postActions.add_Post({title: title, content: content, subject: subject, deadline: deadline, state: state}))
    }


    const editpost = () =>{
        dispatch(postActions.edit_Post({title: title, content: content, subject: subject, deadline: deadline, state: state}, post_id))
    }

    return (
        <>
        <WriteForm>
            <Input type="text" 
            placeholder="타이틀을 적어주세요" 
            label=""
            value={title}
            _onChange={(e) => setTitle(e.target.value)}/>
            <Grid is_flex>
                <Grid is_flex width="210px;"> 
                <select onChange={e => setSubject(e.target.value)}>
                    <option value>Stack 선택</option>
                    <option>React.js</option>
                    <option>Node.js</option>
                    <option>Spring</option>
                    <option>JavaScript</option>
                    <option>Java</option>
                    <option>python</option>
                    <option>알고리즘</option>
                </select>
                </Grid>
                <Grid is_flex width="120px;">
                    <Text>모집인원</Text>
                    <input type="number" label=" " value={state} 
                           placeholder=" " min="1" max="10" onChange={(e) => setState(e.target.value)}/>
                </Grid>
            </Grid>
            <Input textarea placeholder="내용을 적어주세요" label="" 
                   _onChange={(e) => setContent(e.target.value)} value={content}/>
            <Grid is_flex width="240px;">
                <p>모집 마감일</p>
                <input type="date" label="모집 마감일" min={date}
                    onChange={(e) => setDeadline(e.target.value)}/>
            </Grid>
            {is_edit ? (
                <Btn><Button width="120px;" _onClick={editpost}>수정하기</Button></Btn>
            ) : (
                <Btn><Button width="120px;" _onClick={addpost}>등록하기</Button></Btn>        
            )}
        </WriteForm>
        </>
    )
}

const WriteForm = styled.div`
max-width: 980px;
min-width: 400px;
margin: 0 auto;

input[type="text"]{
    height: 50px;
}

select{
  width: 150px;
  padding: 5px 35px 5px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  height: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  font-family: 'NanumSquareRound';

  option{
      margin: 5px 0 ;
  }
}


input[type="number"]{
    width: 50px;
    height: 40px;
    padding: 5px 5px;
    border:1px solid #ddd;
    outline: none;
}

`

const Btn = styled.div`
float: right;
margin-top: 20px;

&:hover{
    button{
        transition: all 0.5s ease;
        background-color: #31a552;
        color: #fff;
    }
}
`;

export default PostWrite