import React, { useEffect } from "react";
import { ItemService } from "../services/ItemService";

export function ItemPage() {
    useEffect(() => {
        ItemService.all();
    }, []);
    return <div>Item</div>;
}
