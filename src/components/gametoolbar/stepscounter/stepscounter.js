import React from "react";

class StepsCounter extends React.Component {
    render() {
        return (
            <div className="col-4 col-sm-2 pb-2">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text px-2"><span className="material-icons">ads_click</span></div>
                    </div>
                    <input type="text" className="form-control text-center px-2" value={this.props.steps}/>
                </div>
            </div>
        );
    }
}

export default StepsCounter;