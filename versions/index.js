import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameField: null,
            countMineOnField: 0,
            countFlags: null,
            countClosedTiles: 256,
            score: 0,
            isGameStopped: true,
            autoRestartCount: 0,
            flags: 40,
            gameStatus: null,
            isGenerated: false,
            generatedField: null
        };
    }

    createGame = () => {
        console.log('Создаю игру');
        //Создание двумерного массива с нулями
        let gameFieldCells = [];
        for (let i = 0; i < 16; i++) {
            gameFieldCells.push(new Array(16).fill(0));
        }
        console.log('Сгенерированный пустой массив: ' + gameFieldCells);
        let gameFieldCells2 = this.generateMines(gameFieldCells);
        let gameFieldCells3 = this.countMineNeighbors(gameFieldCells2);
        this.setState({
            gameField: gameFieldCells3,
            countFlags: 40,
            isGameStopped: false
        });
    };

    generateMines = (fields) => {
        console.log('Генерирую мины');
        let countMinesOnFields = this.state.countMineOnField;
        const size = 16;
        const totalMines = 40;
        const mine = "\uD83D\uDCA3";
        let gameFieldCells = fields;
        //Случайная расстановка мин
        while (countMinesOnFields < totalMines) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            if (countMinesOnFields >= totalMines) {
                break;
            }
            if (gameFieldCells[x][y] === mine) {
                continue;
            }
            gameFieldCells[x][y] = mine;
            countMinesOnFields++;
        }
        this.setState({
            countMineOnField: countMinesOnFields
        });
        return gameFieldCells
    };

    countMineNeighbors = (fields2) => {
        console.log('Считаю мин вокруг')
        let fields = fields2;
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
        console.log('при подсчее соседей: ' + fields);
        return fields
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


    changeCountFlags = () => {
        let fl = this.state.flags;
        fl--;
        this.setState({flags: fl})
    };

    changeResult = () => {
        this.setState({gameStatus: 'Lose'})
    };

    restart = () => {
        this.setState({
            gameField: null,
            countMineOnField: 0,
            countFlags: null,
            countClosedTiles: 256,
            score: 0,
            isGameStopped: true,
            autoRestartCount: 0,
            flags: 40,
            gameStatus: null,
            isGenerated: false,
            generatedField: null
        });
        this.createGame();
    };


    render() {
        console.log('При рендере приложения на поле: ' + this.state.gameField)
        return (
            <>
                <h2>Игра «Сапер»</h2>
                <FlagsCounter flags={this.state.flags}/>
                <StepsCounter/>
                <Timer/>
                <GameField fields={this.state.gameField} res={this.changeResult} flags={this.changeCountFlags} gameStatus={this.state.gameStatus}/>
                <GameStatus res={this.state.gameStatus}/>
                <Restarter onClick={this.restart}/>
            </>
        )
    }
}

class GameField extends React.Component {

    render() {
        console.log("рендер игрового поля");
        let allRows = this.props.fields;
        let rowsArr = null;
        if (allRows) {
            rowsArr = allRows.map((item) => <GameFieldRow arr={item} res={this.props.res} flags={this.props.flags}
                                                          gameStatus={this.props.gameStatus}/>);
        }

        return (
            <p>{rowsArr}</p>
        );
    }
}

function Restarter(props) {
    return (
        <button className='btn btn-warning' onClick={props.onClick}>Старт</button>
    )
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

