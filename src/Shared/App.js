import React, {useEffect} from 'react'
import { Switch, Route} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import {history} from '../redux/configStore'
import { useDispatch} from 'react-redux'
import { actionsCreators as userActions } from '../redux/modules/user';
import PostList from "../pages/PostList";
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Mypage from '../pages/Mypage';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

function App() {
  const dispatch = useDispatch()
  const is_session = localStorage.getItem("token") ? true : false

  useEffect(() => {
    if(is_session){
      dispatch(userActions.getUserCheck())
    }
  }, [])

  return (
    <ConnectedRouter history={history}>
        <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/detail/:id" exact component={PostDetail} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/page/:id" exact component={Mypage} />
        </Switch>
    </ConnectedRouter>
  );
}


export default App;
