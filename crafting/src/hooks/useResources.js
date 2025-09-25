import { useState } from 'react'

export default function useResources() {
    const [resources] = useState(["red", "green", "blue"]);

    const handleDragStart = (event, color) => {
        event.dataTransfer.setData("resource", color);
    };

    return { resources, handleDragStart };
}
