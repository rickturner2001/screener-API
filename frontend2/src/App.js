import React from 'react';
import './App.css';
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {BrowserRouter as Router, Route } from "react-router-dom";
import {PrivateRoute} from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Application} from "./components/Application";
import {WatchLists} from "./pages/WatchLists";
import {WatchlistView} from "./pages/WatchlistView";
import {Theme} from "react-daisyui";
import {StrategiesMenu} from "./components/menus/StrategiesMenu";
import {StrategiesAccount} from "./pages/StrategiesAccount";

function App() {
  return (

      <div className="App">
        <Router>
          <AuthProvider>
            <Theme dataTheme={"emerald"}>
          <Navbar></Navbar>
              <Route component={HomePage} path='/' exact/>
              <PrivateRoute component={Application} path='/application'/>
              <PrivateRoute component={WatchLists} path='/watchlists'/>
              <PrivateRoute component={WatchlistView} path='/watchlist/:id'/>
              <PrivateRoute component={StrategiesMenu} path='/strategies'/>
              <PrivateRoute component={StrategiesAccount} path='/my-strategies'/>
            <Route component={LoginPage} path='/login'/>
            </Theme>
            </AuthProvider>
        </Router>

      </div>
  );
}

export default App;