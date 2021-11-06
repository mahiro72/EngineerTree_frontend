import React from 'react';

import styles from './App.module.css';
import Auth from './features/auth/Auth';
import Home from './features/home/Home';
import Core from './features/core/Core';

import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>

        <Route exact path="/" component={Home} />
        <Route exact path='/core' component={Core}/>
        {/* <Route exact path="/login" component={Auth} /> */}

      </BrowserRouter>
    </div>
  );
}

export default App;
