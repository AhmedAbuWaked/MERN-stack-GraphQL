import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ManagePage from './management/ManagePage';
import Patients from './management/Patients';
import Patient from './patient/Patient';
import { Provider } from 'mobx-react';
import { createStore } from './store/RootStore';

function App() {
  return (
    <Provider {...createStore()}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/manage' component={ManagePage} />
            <Route path='/manage/patients' component={Patients} />
            <Route path='/patient' component={Patient} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
