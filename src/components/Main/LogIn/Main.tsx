import React from 'react';
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import LogIn from "../LogIn";
import SignUp from "../SignUp";
import Test from "../Test";
import NotFound from "../NotFound";

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

            <Route path="/test" >
                <Test />
            </Route>

            <Route >
                <NotFound />
            </Route>

          </Switch>
        
      </main>
  );
}

export default Main;

