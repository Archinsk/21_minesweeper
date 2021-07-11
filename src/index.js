import React from 'react';
import ReactDOM from 'react-dom';
import GameField from './components/gamefield/gamefield';
import GameToolbar from "./components/gametoolbar/gametoolbar";

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('Конструирование приложения');
        this.state = {
            gameField: null,
            countMinesOnField: 0,
            countFlags: null,
            countClosedTiles: 256,
            score: 0,
            isGameStopped: true,
            autoRestartCount: 0,
            gameResult: null,
            startCell: null,
            steps: 0,
            startDate: null,
            finishDate: null,
            topTen: null,
        };
    }

    render() {
        if (this.state.gameField) {
            console.log('При рендере приложения состояние игрового поля: ' + this.state.gameField.map(item => (item.map(item => item.value))))
        }
        return (
            <>
                <h2 className="text-white text-center">Minesweeper</h2>
                <GameToolbar flags={this.state.countFlags} steps={this.state.steps} startDate={this.state.startDate}
                             finishDate={this.state.finishDate}
                             reboot={this.state.countClosedTiles === 256} cells={this.state.countClosedTiles}
                             onClick={this.restart}/>
                <GameField fields={this.state.gameField} leftClick={this.openCell} rightClick={this.toggleFlag}
                           res={this.state.gameResult} score={this.state.score} recordTop={this.ajaxCreateRecord}
                           readTop={this.ajaxReadRecord} topTen={this.state.topTen}/>
            </>
        )
    }

    componentDidMount() {
        console.log('Компонент приложения смонтирован');
        this.createGame();
    }

    componentDidUpdate() {
        console.log('Компонент приложения обновлен');
        if (this.state.startCell) {
            this.openCell(this.state.startCell.x, this.state.startCell.y)
        }
        if (this.state.countClosedTiles === 40 && !this.state.gameResult) {
            this.gameWin()
        }
        if (this.state.gameResult === 'Win' && this.state.score === 0) {
            this.countScore();
        }
    }

    createGame = () => {
        console.log('Создаю игру');
        let gameField = [];
        for (let i = 0; i < 16; i++) {
            gameField.push(new Array(16).fill(null));
            gameField[i][0] = {x: 0, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][1] = {x: 1, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][2] = {x: 2, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][3] = {x: 3, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][4] = {x: 4, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][5] = {x: 5, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][6] = {x: 6, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][7] = {x: 7, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][8] = {x: 8, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][9] = {x: 9, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][10] = {x: 10, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][11] = {x: 11, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][12] = {x: 12, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][13] = {x: 13, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][14] = {x: 14, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
            gameField[i][15] = {x: 15, y: i, value: 0, isMine: false, isFlag: false, isOpen: false, isDetonated: false};
        }
        // console.log('Создано новое поле: ' + gameField);
        gameField = this.generateMines(gameField);
        gameField = this.countMineNeighbors(gameField);
        // console.log('Поле после заполнения: ' + gameField.map( item => (item.map(item => item.value) ) ) );
        this.setState({
            gameField: gameField,
            countFlags: 40,
            isGameStopped: false
        });
        if (this.state.gameField) {
            console.log('Состояние gameField после заполнения: ' + this.state.gameField.map(item => (item.map(item => item.value))));
        }
    };

    generateMines = (gameField) => {
        console.log('Генерация мин');
        let countMinesOnFields = 0;
        const size = 16;
        const totalMines = 40;
        const mine = '\uD83D\uDCA3';
        //Случайная расстановка мин
        while (countMinesOnFields < totalMines) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            if (gameField[x][y].value === mine) {
                continue;
            }
            gameField[x][y].value = mine;
            gameField[x][y].isMine = true;
            countMinesOnFields++;
        }
        this.setState({
            countMinesOnField: countMinesOnFields
        });
        return gameField
    };

    countMineNeighbors = (gameField) => {
        console.log('Подсчет мин вокруг');
        for (let row = 0; row < gameField.length; row++) {
            for (let column = 0; column < gameField[row].length; column++) {
                if (gameField[row][column].value === 0) {
                    let neibArr = this.getNeighbors(column, row, 15, 15);
                    let minesAround = 0;
                    for (let i = 0; i < neibArr.length; i++) {
                        let x = neibArr[i].coordX;
                        let y = neibArr[i].coordY;
                        if (gameField[y][x].value === "\uD83D\uDCA3") {
                            minesAround++;
                        }
                    }
                    gameField[row][column].value = minesAround;
                }
            }
        }
        return gameField
    };

    getNeighbors = (x, y, maxX = 15, maxY = 15) => {
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

    restart = () => {
        console.log('Ручной перезапуск игры');
        this.setState({
            startCell: null,
        });
        this.autoRestart();
    };

    autoRestart = () => {
        console.log('Автоматический перезапуск игры');
        this.setState({
            gameField: null,
            countMinesOnField: 0,
            countFlags: null,
            countClosedTiles: 256,
            score: 0,
            isGameStopped: true,
            autoRestartCount: 0,
            gameStatus: null,
            steps: 0,
            startDate: null,
            finishDate: null,
            topRecord: null,
        });
        // console.log('При перезапуске состояние игрового поля: ' + this.state.gameField)
        this.createGame();
    };

    openCell = (x, y, reboot = false) => {
        if (!this.state.isGameStopped) {
            let cell = this.state.gameField[y][x];
            if (!cell.isFlag && !cell.isOpen) {
                this.setState((state) => {
                    return {
                        steps: state.steps + 1
                    }
                });
            }
            if (!this.state.startDate) {
                this.setState({
                    startDate: Date.now()
                })
            }
            this.openTile(x, y, reboot)
        }
    };

    openTile = (x, y, reboot = false) => {
        if (!this.state.isGameStopped) {
            let gameField = this.state.gameField;
            let cell = gameField[y][x];
            let countClosedTiles = this.state.countClosedTiles;
            console.log('Открытие ячейки ' + cell.x + ' - ' + cell.y);
            console.log('Закрытых ячеек - ' + countClosedTiles + ', значение ячейки - ' + cell.value);
            if (countClosedTiles === 256 && cell.value !== 0 && !reboot) {
                console.log('Первая ненулевая ячейка');
                this.setState({
                    startCell: {x, y},
                });
                this.autoRestart();
            } else {
                this.setState({
                    startCell: null
                });
                console.log('Уже не первая ячейка');
                if (!cell.isFlag && !cell.isOpen) {
                    if (cell.isMine) {
                        console.log('Здесь мина');
                        cell.isOpen = true;
                        cell.isDetonated = true;
                        this.gameOver();
                    } else if (cell.value === 0) {
                        console.log('Закрытая нулевая ячейка');
                        cell.isOpen = true;
                        countClosedTiles--;
                        let neibArr = this.getNeighbors(cell.x, cell.y);
                        for (let i = 0; i < neibArr.length; i++) {
                            if (!gameField[neibArr[i].coordY][neibArr[i].coordX].isOpen) {
                                this.openTile(neibArr[i].coordX, neibArr[i].coordY, true)
                            }
                        }
                        this.setState((state) => {
                            return {
                                gameField: gameField,
                                countClosedTiles: state.countClosedTiles - 1
                            }
                        })
                    } else {
                        console.log('Закрытая ненулевая ячейка');
                        cell.isOpen = true;
                        countClosedTiles--;
                        this.setState((state) => {
                            return {
                                gameField: gameField,
                                countClosedTiles: state.countClosedTiles - 1
                            }
                        })
                    }
                }
            }
        }
    };

    gameOver = () => {
        let gameField = this.state.gameField;
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField[i].length; j++) {
                let cell = gameField[i][j];
                if (cell.isMine && !cell.isOpen) {
                    cell.isOpen = true;
                }
            }
        }

        this.setState({
            isGameStopped: true,
            gameResult: 'Lose',
            gameField: gameField,
            finishDate: Date.now()
        });
    };

    countScore = () => {
        const time = Math.floor((this.state.finishDate - this.state.startDate) / 1000);
        const steps = this.state.steps;
        let timeScore = 640;
        let stepsScore = 1;

        switch (true) {
            case (time <= 30) :
                timeScore += (30 - time);
            case (time <= 60) :
                timeScore += (60 - time);
            case (time <= 90) :
                timeScore += (90 - time);
            case (time <= 120) :
                timeScore += (120 - time);
            case (time <= 150) :
                timeScore += (150 - time);
            case (time < 180) :
                timeScore += (180 - time);
                break;
            case (time > 360) :
                timeScore = 10;
                break;
            case (time >= 330) :
                timeScore -= (time - 330);
            case (time >= 300) :
                timeScore -= (time - 300);
            case (time >= 270) :
                timeScore -= (time - 270);
            case (time >= 240) :
                timeScore -= (time - 240);
            case (time >= 210) :
                timeScore -= (time - 210);
            case (time > 180) :
                timeScore -= (time - 180);
                break;
            default:
                timeScore = 640;
        }

        if (steps > 150) {
            stepsScore = 0.1
        } else if (steps > 75) {
            const stepDown = 0.9 / 75;
            stepsScore -= (steps - 75) * stepDown
        }
        if (steps < 75) {
            const stepUp = 1.8 / 75;
            stepsScore += (75 - steps) * stepUp;
        }


        this.setState({
            score: Math.round(timeScore * stepsScore)
        });
        console.log('Время -' + time + ', кликов - ' + steps)
    };

    gameWin = () => {
        let gameField = this.state.gameField;
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField[i].length; j++) {
                let cell = gameField[i][j];
                if (cell.isMine && !cell.isFlag) {
                    cell.isFlag = true;
                }
            }
        }

        this.setState({
            isGameStopped: true,
            gameResult: 'Win',
            finishDate: Date.now()
        });
    };


    toggleFlag = (event, x, y) => {
        event.preventDefault();
        console.log('Изменение состояния флага');
        if (!this.state.isGameStopped && this.state.countClosedTiles !== 256) {
            let gameField = this.state.gameField;
            let cell = gameField[y][x];
            let countFlags = this.state.countFlags;
            if (!cell.isOpen) {
                if (!cell.isFlag) {
                    if (countFlags > 0) {
                        cell.isFlag = !cell.isFlag;
                        countFlags--;
                    }
                } else {
                    cell.isFlag = !cell.isFlag;
                    countFlags++;
                }
            }
            this.setState({
                gameField: gameField,
                countFlags: countFlags
            });
        }
    };

    topTenRecordToState = (arr) => {
        this.setState({
            topTen: arr,
        });
    };

    //-----------------Ajax----------------
    ajaxReadRecord = (url, requestText, action = this.topTenRecordToState) => {
        let xhr = new XMLHttpRequest();
        let topArray;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let topArrayObj = JSON.parse('{"obj":[' + this.responseText + ']}');
                topArray = topArrayObj.obj;
                console.log('topArray = ' + topArray);
                action(topArray);
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(requestText);
    };

    ajaxCreateRecord = (url, requestText, action) => {
        let xhr = new XMLHttpRequest();
        console.log('В Ajax-запросе текст запроса = ' + requestText)
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(requestText);
    };
}

ReactDOM.render(
    <App/>
    , document.getElementById('root'));

