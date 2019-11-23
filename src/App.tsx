import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navigation } from "./application/Navigation";
import { MonsterPage } from "./monster/MonsterPage";

const App: React.FC = () => {
    return (
        <Router>
            <div className="container-fluid app">
                <Navigation />
                <Switch>
                    <Route path="/monsters">
                        <MonsterPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
