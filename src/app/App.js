import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './router';

const App = () => (
  (
    <Router>
      <div>
        { Routes }
      </div>
    </Router>
  )
);

export default App;
