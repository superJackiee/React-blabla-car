import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import AddTutorial from "./components/AddTutorial";
// import Tutorial from "./components/Tutorial";
// import TutorialsList from "./components/TutorialsList";
import MapRoute from "./pages/MapRoute";
import Boost from "./pages/Boost";
import AddWayPoint from "./pages/AddWayPoint";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mw-100 p-0">
        <Switch>
          {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} /> */}
          <Route exact path={["/", "/tutorials"]} component={MapRoute} />
          {/* <Route exact path="/add" component={AddTutorial} /> */}
          {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
          <Route path="/boost" component={Boost} />
          <Route path="/addwaypoint" component={AddWayPoint} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
