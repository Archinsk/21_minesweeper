import React from "react";

function Result(props) {
    let result = ('You ' + props.res + '!').toUpperCase();
    let scores = '';
    if (props.res === 'Win') {
        scores = <div className='score glow text-white text-center'>Score: {props.score}</div>
    }
    return (
        <div>
            <div className="glow text-white text-center">
                {result}
            </div>
            {scores}
        </div>
    );
}

export default Result;