import React from "react";
import { NavLink } from "react-router-dom";
import { BemBuilder } from "../utils/BemBuilder";
import "./Navigation.css";

const ITEMS = [
    {
        path: "",
        label: "Home",
        exact: true
    },
    {
        path: "monsters",
        label: "Monsters"
    },
    {
        path: "items",
        label: "Items"
    },
    {
        path: "adventures",
        label: "Adventures"
    }
];

const BEM = new BemBuilder("navigation");

export function Navigation() {
    return (
        <nav className={`nav ${BEM.block}`}>
            {ITEMS.map(i => (
                <NavLink
                    key={i.path}
                    to={i.path}
                    className="nav-link"
                    activeClassName="border-bottom border-primary"
                    exact={i.exact}
                >
                    {i.label}
                </NavLink>
            ))}
        </nav>
    );
}
