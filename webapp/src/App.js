import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import PageHome from './pages/Home/Home';
import Rules from './pages/Rules/Rules';
import GameMenu from './pages/Game/GameMenu';
import GameMenuCreate from './pages/Game/GameCreate';
import GameMenuJoin from './pages/Game/GameJoin';
import HomeButton from './components/Button/HomeButton'
import { WSocketsProvider } from './components/wsapi/WSockets';
import { PlayerProvider }  from './components/Player/PlayerContext';
import './App.css';

/*Il faut bien faire attention qu'une route ne prenne pas la priorité sur une autre par exemple si je fais une route 

<Route path="/rules" component={Rules} />
<Route path="/rules/rule1" component={Rule1} />

et que mon url est : /rules/rule1
le component retourner sur Rules et non Rules1 
Il faut donc faire : 

<Route path="/rules/rule1" component={Rule1} />
<Route path="/rules" component={Rules} />
*/
const App = () => {
  return(
  <HashRouter>
    <WSocketsProvider>
      <PlayerProvider>
        <Route path="/rules" component={HomeButton} />
        <Route path="/game/menu" component={HomeButton} />
        <Switch>
          <Route path="/rules" component={Rules} />
          <Route path="/game/menu/create" component={GameMenuCreate} />
          <Route path="/game/menu/join" component={GameMenuJoin} />
          <Route path="/game/menu" component={GameMenu} />
          <Route path="/" component={PageHome} />
        </Switch>
      </PlayerProvider>
    </WSocketsProvider>
  </HashRouter>
);
  };

export default App;
