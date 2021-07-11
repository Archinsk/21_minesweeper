import React from "react";
import FlagsCounter from "./flagscounter/flagscounter";
import StepsCounter from "./stepscounter/stepscounter";
import Timer from "./timer/timer";
import ClosedCells from "./closedcells/closedcells";
import Restarter from "./restarter/restarter";

class GameToolbar extends React.Component {
    render() {
        return (
            <form className="game-bar">
                <div className="form-row pt-2 px-1 mx-0">
                    <FlagsCounter flags={this.props.flags}/>
                    <StepsCounter steps={this.props.steps}/>
                    <Timer startDate={this.props.startDate} finishDate={this.props.finishDate}
                           reboot={this.props.reboot}/>
                    <ClosedCells cells={this.props.cells}/>
                    <Restarter onClick={this.props.onClick}/>
                </div>
            </form>
        );
    }
}

export default GameToolbar;