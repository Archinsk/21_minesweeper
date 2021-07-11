import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIsStopped: true,
            flags: 40,
            gameStatus: null
        }
    }

    changeCountFlags = () => {
        let fl = this.state.flags;
        fl--;
        this.setState({flags: fl})
    };

    changeResult = () => {
        this.setState({gameStatus: 'Lose'})
    };

    render() {
        console.log("рендер приложения" + this.state.gameStatus);
        return (
            <>
                <h2>Игра «Сапер»</h2>
                <FlagsCounter flags={this.state.flags}/>
                <StepsCounter/>
                <Timer/>
                <GameField res={this.changeResult} flags={this.changeCountFlags} gameStatus={this.state.gameStatus}/>
                <GameStatus res={this.state.gameStatus}/>
            </>
        )
    }
}

class FlagsCounter extends React.Component {
    render() {
        return (
            <p>Количество флагов - {this.props.flags}</p>
        );
    }
}

class StepsCounter extends React.Component {
    render() {
        return (
            <p>Шагов - 0</p>
        );
    }
}

class Timer extends React.Component {
    render() {
        return (
            <p>Время игры - 00:00</p>
        );
    }
}

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGenerated: false,
            generatedField: null
        }
    }

    countMinesAroundForAllCells = (fields) => {
        for (let row = 0; row < fields.length; row++) {
            for (let column = 0; column < fields[row].length; column++) {
                if (fields[row][column] === 0) {
                    let neibArr = this.getNeighbors(column, row, 15, 15)
                    let minesAround = 0;
                    for (let i = 0; i < neibArr.length; i++) {
                        let x = neibArr[i].coordX;
                        let y = neibArr[i].coordY;
                        if (fields[y][x] === "\uD83D\uDCA3") {
                            minesAround++;
                        }
                    }
                    fields[row][column] = minesAround;
                }
            }
        }
        return fields;
    };

    getNeighbors = (x, y, maxX, maxY) => {
        let neighbors = [];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i < 0 || i > maxX) {
                    continue;
                }
                if (j < 0 || j > maxY) {
                    continue;
                }
                if (i === x && j === y) {
                    continue;
                }
                let coords = {coordX: i, coordY: j};
                neighbors.push(coords);
            }
        }
        return neighbors;
    };

    createGame = () => {
        if (!this.state.isGenerated) {
            let genField = this.generateMines();
            this.setState({
                isGenerated: true,
                generatedField: genField
            });
            return genField;
        } else {
            return this.state.generatedField;
        }
    };

    generateMines = () => {
        console.log('Генерирую мины')
        let countMinesOnField = 0;
        const size = 16;
        const totalMines = 40;
        //Создание двумерного массива с нулями
        let gameField = [];
        for (let i = 0; i < size; i++) {
            gameField.push(new Array(size).fill(0));
        }
        //Случайная расстановка мин
        while (countMinesOnField < totalMines) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            if (countMinesOnField >= totalMines) {
                break;
            }
            if (gameField[x][y] === "\uD83D\uDCA3") {
                continue;
            }
            gameField[x][y] = "\uD83D\uDCA3";
            countMinesOnField++;
        }
        gameField = this.countMinesAroundForAllCells(gameField);
        return gameField;
    };

    render() {
        let allRows = this.createGame();
        let rowsArr = allRows.map((item) => <GameFieldRow arr={item} res={this.props.res} flags={this.props.flags}
                                                          gameStatus={this.props.gameStatus}/>);
        console.log("рендер игрового поля" + this.props.gameStatus);
        return (
            <p>{rowsArr}</p>
        );
    }
}

class GameFieldRow extends React.Component {
    render() {
        console.log("рендер строки");
        return (
            <>
                {this.props.arr.map((item) => <Cell num={item} res={this.props.res} flags={this.props.flags}
                                                    gameStatus={this.props.gameStatus}/>)}
                <br/>
            </>
        )
    }
}

class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isMine: false,
            isFlag: false,
            minesAround: 0
        }
    }

    shouldComponentUpdate() {
        return !this.props.gameStatus;
    }

    openCell = () => {
        if (!this.props.gameStatus) {
            if (!this.state.isOpen) {
                this.setState({
                    isOpen: true
                })
            }
        }
    };

    setFlag = (event) => {
        console.log(this.props.gameStatus);
        event.preventDefault();
        if (!this.props.gameStatus) {
            if (!this.state.isFlag) {
                this.setState({
                    isFlag: true
                })
                this.props.flags();
            } else {
                this.setState({
                    isFlag: false
                })
            }
        }
    };

    render() {
        console.log("рендер ячейки");
        let clName = 'btn btn-secondary';
        let letter = '';
        if (this.state.isFlag) {
            letter = "\uD83D\uDEA9";
        }
        if (this.state.isOpen) {
            if (this.props.num !== 0) {
                letter = this.props.num;
            }
            if (this.props.num === "\uD83D\uDCA3") {
                clName = 'btn btn-danger';
                this.props.res();
            } else {
                clName = 'btn btn-primary';
            }
        }
        return (
            <button className={clName} onClick={this.openCell}
                    onContextMenu={this.setFlag}>{letter}</button>
        )
    }
}

function GameStatus(props) {
    return (
        <div>
            Результат: {props.res}
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));

