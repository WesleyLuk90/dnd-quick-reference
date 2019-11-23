import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navigation } from "./application/Navigation";
import { MonsterPage } from "./monster/MonsterPage";

const App: React.FC = () => {
    return (
        <div className="container-fluid">
            <Router>
                <Navigation />
                <Switch>
                    <Route path="/monsters">
                        <MonsterPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
