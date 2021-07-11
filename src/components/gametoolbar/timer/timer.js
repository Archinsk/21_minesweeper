import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finishDate: null,
            isTimerGoing: false
        };
    }

    render() {
        let timeInMs;
        let min;
        let sec;
        if (this.props.startDate && this.state.finishDate && (this.state.finishDate > this.props.startDate)) {
            timeInMs = this.state.finishDate - this.props.startDate;
            min = (Math.floor(timeInMs / 1000 / 60) % 60).toString().padStart(2, '0');
            sec = (Math.floor(timeInMs / 1000) % 60).toString().padStart(2, '0');
        } else {
            min = '00';
            sec = '00'
        }

        return (
            <div className="col-4 col-sm-2 pb-2">
                <input type="text" className="form-control text-center" value={min + ':' + sec} readOnly/>
            </div>
        );
    }

    componentDidUpdate() {
        console.log('Компонент таймера обновлен');
        if (!this.state.isTimerGoing && this.props.startDate && !this.props.finishDate) {
            console.log('Запуск таймера');
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
            this.setState(() => {
                return {
                    isTimerGoing: true
                }
            })
        }
        if (this.props.finishDate) {
            clearInterval(this.timerID);
            console.log('Таймер остановился');
        }

        if (this.props.reboot && this.state.isTimerGoing) {
            console.log(this.props.reboot);
            this.setState({
                    isTimerGoing: false
                }
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            finishDate: Date.now()
        });
    }
}

export default Timer;