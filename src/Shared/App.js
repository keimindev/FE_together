import { Switch, Route} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import {history} from '../redux/configStore'
import PostList from "../pages/PostList";
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Mypage from '../pages/Mypage';

import Header from "./Header";
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function App() {
  return (
    <ConnectedRouter history={history}>
        <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/detail/:id" exact component={PostDetail} />
        <Route path="/page/:id" exact component={Mypage} />
        </Switch>
    </ConnectedRouter>
  );
}


export default App;
