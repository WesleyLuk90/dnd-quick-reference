import React from "react";
import "./App.css";
import { MonsterCard } from "./components/MonsterCard";

const App: React.FC = () => {
    return (
        <div>
            <MonsterCard monster={{ name: "Claugiyliamatar" }} />
        </div>
    );
};

export default App;
