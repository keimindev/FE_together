import { Switch, Route} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import {history} from '../redux/configStore'
import PostList from "../pages/PostList";
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Mypage from '../pages/Mypage';

import Header from "./Header";

function App() {
  return (
    <ConnectedRouter history={history}>
        <Header/>
        <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/detail/:id" exact component={PostDetail} />
        <Route path="/page/:id" exact component={Mypage} />
        </Switch>
    </ConnectedRouter>
  );
}


export default App;
