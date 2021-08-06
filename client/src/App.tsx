import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Add from "./components/Add";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/add" component={Add} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
