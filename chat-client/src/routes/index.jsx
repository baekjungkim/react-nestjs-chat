import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Chats from '../pages/chats';
import Chat from '../pages/chat';
import Home from '../pages/home';

const GoHome = (props) => {
  props.history.replace('/');
  return (<></>);
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chats" component={Chats} />
        <Route exact path="/chat/:chatId" component={Chat} />
        
        
        <Route exact path="/chat" component={GoHome} />
      </Switch>
    </Router>
  );
}

export default Routes;