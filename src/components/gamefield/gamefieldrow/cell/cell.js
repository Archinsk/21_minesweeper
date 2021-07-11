import React from "react";

class Cell extends React.Component {
    render() {
        let clName = 'btn cell-closed btn-block btn-sm cell p-0';
        let letter = '';
        if (this.props.cellState.isFlag) {
            letter = "\uD83D\uDEA9";
        }
        if (this.props.cellState.isOpen) {
            if (this.props.cellState.value !== 0) {
                letter = this.props.cellState.value;
            }
            switch (this.props.cellState.value) {
                case '\uD83D\uDCA3' :
                    if (this.props.cellState.isDetonated) {
                        clName = 'btn cell-mined btn-block btn-sm cell p-0';
                    }
                    break;
                case 0 :
                    clName = 'btn cell-clean btn-block btn-sm cell p-0';
                    break;
                case 1 :
                    clName = 'btn cell-danger danger-1 btn-block btn-sm cell p-0';
                    break;
                case 2 :
                    clName = 'btn cell-danger danger-2 btn-block btn-sm cell p-0';
                    break;
                case 3 :
                    clName = 'btn cell-danger danger-3 btn-block btn-sm cell p-0';
                    break;
                default:
                    clName = 'btn cell-danger danger-4 btn-block btn-sm cell p-0';
            }
        }
        return (
            <button className={clName} type="button"
                    onClick={() => this.props.leftClick(this.props.cellState.x, this.props.cellState.y)}
                    onContextMenu={(event) => this.props.rightClick(event, this.props.cellState.x, this.props.cellState.y)}>
                <div className="content">
                    {letter}
                </div>
            </button>
        )
    }
}

export default Cell;