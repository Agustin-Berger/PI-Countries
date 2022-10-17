import "./App.css";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Detalle from "./Detalle/Detalle";
import Crear from "./Crear/Crear";
import Landing from "./Landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/countries" component={Home} />
          <Route exact path="/countries/:id" component={Detalle} />
          <Route exact path="/create" component={Crear} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
