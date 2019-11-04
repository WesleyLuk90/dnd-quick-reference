import React from "react";
import "./App.css";
import { CreatureCard } from "./components/CreatureCard";

const App: React.FC = () => {
    return (
        <div>
            <CreatureCard monster={{ name: "goblin" }} />
        </div>
    );
};

export default App;
