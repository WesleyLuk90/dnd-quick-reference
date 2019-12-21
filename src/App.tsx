import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AdventuresPage } from "./adventures/AdventuresPage";
import "./App.css";
import { Navigation } from "./application/Navigation";
import { ItemPage } from "./monster/ItemPage";
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
                    <Route path="/items">
                        <ItemPage />
                    </Route>
                    <Route path="/adventures">
                        <AdventuresPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
