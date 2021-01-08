import React from 'react';
import { Route, Switch } from "react-router-dom";

import Home from "./Main/Home";
import LogIn from "./Main/LogIn";
import SignUp from "./Main/SignUp";
import NotFound from "./Main/NotFound";

//import SignUp from "./components/Auth/SignUp";

import styles from './Main.module.scss';


type PropsMain = {};

function Main({}: PropsMain) {
  return (
    
    <main className={`${styles['root']}`}>
          <Switch>
            
            <Route exact path="/" >
                <Home />
            </Route>

            <Route path="/log-in" >
                <LogIn />
            </Route>

            <Route path="/sign-up" >
                <SignUp />
            </Route>

            <Route >
                <NotFound />
            </Route>

          </Switch>
        
      </main>
  );
}

export default Main;

