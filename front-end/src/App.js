import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ManagePage from './management/ManagePage';
import Patient from './patient/Patient';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/manage' component={ManagePage} />
          <Route path='/patient' component={Patient} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
