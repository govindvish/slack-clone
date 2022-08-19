import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';

function App() {
  return (
    <div className='app'>
      <Router>
        <>
          <Switch>
            <Route path='/' exact>
              <Header />
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
