import React from "react";
import Cell from "./cell/cell";

class GameFieldRow extends React.Component {
    render() {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const cellsPropsArray = this.props.arr;
        let cellsArray = numbers.map((num) =>
            <div className="col p-0">
                <Cell key={num} cellState={cellsPropsArray[num]}
                      leftClick={this.props.leftClick}
                      rightClick={this.props.rightClick}
                />
            </div>);
        return <div className="row mx-0">
            <div className="col">
                <div className="row">
                    {cellsArray[0]}
                    {cellsArray[1]}
                    {cellsArray[2]}
                    {cellsArray[3]}
                </div>
            </div>
            <div className="col">
                <div className="row">
                    {cellsArray[4]}
                    {cellsArray[5]}
                    {cellsArray[6]}
                    {cellsArray[7]}
                </div>
            </div>
            <div className="col">
                <div className="row">
                    {cellsArray[8]}
                    {cellsArray[9]}
                    {cellsArray[10]}
                    {cellsArray[11]}
                </div>
            </div>
            <div className="col">
                <div className="row">
                    {cellsArray[12]}
                    {cellsArray[13]}
                    {cellsArray[14]}
                    {cellsArray[15]}
                </div>
            </div>
        </div>;
    }
}

export default GameFieldRow;