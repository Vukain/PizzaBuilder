import React, { useState } from "react";


const Test = (props) => {
    const [timer, setTimer] = useState(0)
    console.log(timer)
    return (
        <p onClick={() => setTimer(timer + 1)}>{timer}</p>
    );
}

export default Test;