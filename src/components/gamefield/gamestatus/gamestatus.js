import React from "react";
import Result from "./result/result";
import NameForm from "./nameform/nameform";
import RecordTable from "./recordtable/recordtable";

class GameStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleResult: true,
            isVisibleForm: false,
            isVisibleTable: false,
            topTen: this.props.topTen,
        }
    }

    render() {
        console.log('Рендер GameStatus');
        let resultPanel;
        let topTen = this.props.topTen;
        let score = this.props.score;
        if (this.props.res === 'Win') {
            if (this.state.isVisibleResult) {
                this.props.readTop('readRecord.php', '');
                if (topTen) {
                    if (score > topTen[9].score) {
                        this.timerID = setTimeout(
                            () => this.hiddenResult(),
                            5000
                        );
                    }
                }
            }
        }

        if (this.state.isVisibleResult) {
            resultPanel = <Result res={this.props.res} score={this.props.score} readTop={this.props.readTop}/>
        }

        if (this.state.isVisibleForm) {
            resultPanel = <NameForm isRecord='true' recordTop={this.props.recordTop} score={this.props.score} table={this.showTable}/>
        }

        if (this.state.isVisibleTable) {
            resultPanel = <RecordTable topTen={this.state.topTen}/>
        }

        return (
            <>
                <div className='resultBack'/>
                <div className='result'>
                    {resultPanel}
                </div>
            </>
        );
    }

    hiddenResult() {
        this.setState({
            isVisibleResult: false,
            isVisibleForm: true
        });
        console.log('Скрываем результат')
    }

    showTable = (player) => {
        let score = this.props.score;
        console.log('Очки в showTable = ' + score);
        let topArr = this.props.topTen;
        console.log('topArr = ' + topArr);
        console.log('topArr[9] = ' + topArr[9]);
        console.log('topArr[9].score = ' + topArr[9].score);
        console.log('Очки последнего = ' + topArr[9].score);
        topArr[9].player = player;
        topArr[9].score = score;
        topArr.sort(function(a, b) { return b.score - a.score; });
        this.setState({
            isVisibleForm: false,
            isVisibleTable: true,
            topTen: topArr,
        });
        console.log('Скрываем форму')
    }
}

export default GameStatus;