import Question from './components/Question/Question'
import Notes from './components/Notes/Notes'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Question />
          </Route>
          <Route path='/notes'>
            <Notes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
