import Question from './components/Question/Question'
import Notes from './components/Notes/Notes'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sign-out">
          <AmplifySignOut />
        </div>
        <Switch>
          <Route exact path='/'>
            <Question />
          </Route>
          <Route path='/notes'>
            <Notes />
          </Route>
        </Switch>
        {/* <div className="sign-out">
          <AmplifySignOut />
        </div> */}
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
