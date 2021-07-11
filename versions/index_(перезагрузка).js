import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('Запуск конструктора приложения');
        this.state = {
            gameField: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
        }
    }

    renderCell = (i) => {
        return <Cell value={this.state.gameField[i]} onClick={() => this.openCell(i)}/>
    };

    openCell(i) {
        let gameField = this.state.gameField;
        gameField[i] = 'X';
        this.setState({
            gameField: gameField
        })
    }

    render() {
        console.log('Рендер приложения');
        return (
            <>
                {this.renderCell(0)}
                {this.renderCell(1)}
                {this.renderCell(2)}
                <br/>
                {this.renderCell(3)}
                {this.renderCell(4)}
                {this.renderCell(5)}
                <br/>
                {this.renderCell(6)}
                {this.renderCell(7)}
                {this.renderCell(8)}
                <br/><br/>
                <Restarter onClick={this.restart}/>
            </>
        );
    }

    componentDidMount() {
        console.log('Приложение размещено на странице.');
    }

    restart = () => {
        console.log('Перезапуск');
        this.setState({
            gameField: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
        })
    }
}

class Cell extends React.Component {

    // constructor(props) {
    //     super(props);
    //     console.log('Запуск конструктора ячейки №' + this.props.value + ' (метод Mounting №1)');
    //     this.state = {
    //         isOpen: false
    //     };
    //     console.log('Состояние в конструкторе ячейки №' + this.props.value + ' = ' + this.state.gameField);
    // }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('Стейты из пропсов ячейки №' + props.value + ' (метод Mounting №2)');
    // }

    render() {
        console.log('Рендер ячейки №' + this.props.value + ' метод Mounting №3');
        return (
            <button className='btn btn-secondary' type='button' onClick={this.props.onClick}>{this.props.value}</button>
        )
    }

    // componentDidMount() {
    //     console.log('Ячейка №' + this.props.value + ' размещена на странице. Метод Mounting №4');
    // }
}

class Restarter extends React.Component {
    render() {
        console.log('Рендер кнопки перезапуска');
        return <button className='btn btn-warning' onClick={this.props.onClick}>Перезапуск</button>;
    }

    // componentDidMount() {
    //     console.log('Кнопка перезапуска размещена на странице. Метод Mounting №4');
    // }
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
