import React from "react";
import GameFieldRow from "./gamefieldrow/gamefieldrow";
import GameStatus from "./gamestatus/gamestatus";

class GameField extends React.Component {
    render() {
        console.log("Рендер игрового поля");
        let rowsArr = null;

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const rowsPropsArray = this.props.fields;


        if (rowsPropsArray) {
            let rowsArray = numbers.map((num) => <GameFieldRow key={num} arr={rowsPropsArray[num]}
                                                               leftClick={this.props.leftClick}
                                                               rightClick={this.props.rightClick}/>);
            rowsArr = <>{rowsArray}</>;
        }

        let gameField;
        if (!this.props.res) {
            gameField = (
                <p>{rowsArr}</p>
            )
        } else {
            gameField = (
                <>
                    <p>{rowsArr}</p>
                    <GameStatus res={this.props.res} score={this.props.score} recordTop={this.props.recordTop}
                                readTop={this.props.readTop} topTen={this.props.topTen}/>
                </>
            )
        }
        return (
            <div className='gamefield'>
                {gameField}
            </div>
        );
    }
}

export default GameField;