import React from "react";

class FlagsCounter extends React.Component {

    render() {
        const letter = "\uD83D\uDEA9";
        return (
            <div className="col-4 col-sm-2 pb-2">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text px-2">{letter}</div>
                    </div>
                    <input type="text" className="form-control text-center px-2" value={this.props.flags}/>
                </div>
            </div>
        );
    }
}

export default FlagsCounter;