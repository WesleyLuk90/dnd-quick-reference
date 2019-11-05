import React from "react";
import { MonsterReference } from "../models/Monster";
import { MonsterService } from "../services/MonsterService";
import { loader } from "./Loader";
import { MonsterSheet } from "./MonsterSheet";

interface Props {
    monster: MonsterReference;
}

export function MonsterCard(props: Props) {
    return loader(
        () => MonsterService.get(props.monster),
        monster => <MonsterSheet monster={monster} />
    );
}
