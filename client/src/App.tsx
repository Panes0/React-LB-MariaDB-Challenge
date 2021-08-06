import React from "react";
import { Switch, Route } from "react-router";
import "./App.css";

import Add from "./components/Add";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login/" component={Login} />
        <Route path="/add" component={Add} />
      </Switch>
    </div>
  );
}

export default App;
