import './App.css';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import PageHome from './pages/Home/Home';
import Rules from './pages/Rules/Rules';
import GameMenu from './pages/Game/GameMenu';
import HomeButton from './components/Button/HomeButton'

/*Il faut bien faire attention qu'une route ne prenne pas la priorité sur une autre par exemple si je fais une route 

<Route path="/rules" component={Rules} />
<Route path="/rules/rule1" component={Rule1} />

et que mon url est : /rules/rule1
le component retourner sur Rules et non Rules1 
Il faut donc faire : 

<Route path="/rules/rule1" component={Rule1} />
<Route path="/rules" component={Rules} />
*/
const App = () => (
  <HashRouter>
    <Route path="/rules" component={HomeButton} />
    <Route path="/game/menu"  component={HomeButton} />
      <Switch>
        <Route path="/rules" component={Rules} />
        <Route path="/game/menu" component={GameMenu} />
        <Route path="/" component={PageHome} />
      </Switch>
  </HashRouter>
);

export default App;
