import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Numbers from "./Numbers";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="main">
          <Route exact path="/" component={Numbers} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
