import React from "react";

class ClosedCells extends React.Component {
    render() {
        let openedCells = Math.round((256 - this.props.cells) / 216 * 100);
        let progressStyle = {width: openedCells + '%'};
        return (
            <div className="col-10 col-sm-5 pb-2">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text material-icons">lock_open</span>
                    </div>
                    <div className="progress form-control p-0">
                        <div className="progress-bar" role="progressbar" style={progressStyle}
                             aria-valuenow={openedCells}
                             aria-valuemin="0" aria-valuemax="100">{openedCells}%
                        </div>
                    </div>
                    <div className="input-group-append">
                        <span className="input-group-text material-icons">lock</span>
                    </div>
                    {/*<p>*/}
                    {/*    Уже открыто {256 - this.props.cells} , осталось открыть {this.props.cells - 40} ячеек*/}
                    {/*</p>*/}
                </div>
            </div>
        )
    }
}

export default ClosedCells;