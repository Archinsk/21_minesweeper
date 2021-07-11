import React from "react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleClick = () => {
        let player = this.state.value;
        let request = 'player=' + this.state.value + '&score=' + this.props.score;
        console.log('Текст запроса в handleClick - ' + request);
        this.props.recordTop('createRecord.php', request);
        this.props.table(player);
    };

    render() {

        return (
            <div>
                <form className='recordName'>
                    <fieldset>
                        <legend className='text-white text-center'>You are in top 10!</legend>
                        <div className='form-row'>
                            <div className="col-10">
                                <input type="text" className="form-control" id="nameRecord"
                                       placeholder="Enter your name" value={this.state.value}
                                       onChange={this.handleChange} required/>
                            </div>
                            <div className="col-2">
                                <button type="button" className="btn btn-block btn-sm btn-primary p-0"
                                        onClick={this.handleClick}><span
                                    className="material-icons">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default NameForm;