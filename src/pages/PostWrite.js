import React , {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionsCreators as postActions } from '../redux/modules/post'
import { actionsCreators as userActions } from '../redux/modules/user'
import { axiosInstance } from '../config'
import {history} from '../redux/configStore'
import moment from 'moment'
import Grid from '../elements/Grid'
import Button from '../elements/Button'
import Input from '../elements/Input'
import Text from '../elements/Text'
import styled from 'styled-components'
import Header from '../Shared/Header'

const PostWrite = (props) => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [postInfo, setPostInfo] = useState([])
    
    //eidt
    const id = props.match.params.id
    const is_edit = id ? true : false

    useEffect(() =>{
        dispatch(userActions.getUserCheck())
        if(!token){
            window.alert('로그인 먼저 해주세요!')
            history.push('/login');
            return;
        }

        axiosInstance.get(`/api/post/${id}`, )
        .then((res) =>{
            setPostInfo(res.data)
        })
        .catch((err)=> console.log(err))

    },[])

    console.log(postInfo, postInfo.title)

    const [title, setTitle] = useState(postInfo ? postInfo.title : ""); 
    const [content,setContent] = useState(postInfo ? postInfo.content : "");
    const [subject,setSubject] = useState();
    const [deadline,setDeadline] = useState();
    const [state,setState] = useState(postInfo ? postInfo.state : "");
    const date = moment().format("YYYY-MM-DD")

    const addpost =() =>{

        if( !title || !content || !subject || !deadline || !state ){
            window.alert("빈 공간을 채워주세요!")
            return ;
        }


        dispatch(postActions.add_Post({
            title: title, 
            subject: subject,
            content: content,  
            deadline: deadline, 
            state: state
        }))


    }

    const editpost = () =>{
        if( !title || !content || !subject || !deadline || !state ){
            window.alert("빈 공간을 채워주세요!")
            return ;
        }
        dispatch(postActions.edit_Post({
            title: title, 
            subject: subject,
            content: content, 
            deadline: deadline, 
            state: state
        }, id))
        window.location.href = "/";
    }

    return (
        <>
        <Header/>
        <WriteForm>
            <Input type="text" 
            placeholder="타이틀을 적어주세요" 
            label=""
            _onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
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
                <Btn><Button width="120px;" _onClick={editpost}>수정 등록</Button></Btn>
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
padding: 0 20px;

input[type="text"]{
    height: 50px;
    border-radius: 20px;
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
  border-radius: 30px;

  option{
      margin: 5px 0 ;
  }
}


input[type="number"]{
    width: 60px;
    height: 40px;
    padding: 5px 10px;
    border:1px solid #ddd;
    outline: none;
    border-radius: 30px;
}

`

const Btn = styled.div`
float: right;
margin-top: 20px;

&:hover{
    button{
        transition: all 0.5s ease;
        background-color: #007a59;
        color: #fff;
    }
}
`;

export default PostWrite