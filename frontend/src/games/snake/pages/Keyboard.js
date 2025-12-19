import React, { useEffect, useState } from "react";

function KeyboardDemo() {
    const [lastKey, setLastKey] = useState(null);

    useEffect(() => {
        function handleKeyDown(e) {
            // log the raw key
            console.log("key pressed:", e.key);

            // store it in state
            setLastKey(e.key);

            // example: filter for movement keys
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                // prevent scrolling the page with arrow keys/space
                e.preventDefault();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div style={{ padding: "1rem" }}>
            <p>Press arrow keys or spacebar…</p>
            <p>Last key: {lastKey}</p>
        </div>
    );
}

export default KeyboardDemo;
