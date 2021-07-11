import React from "react";

function RecordTable(props) {
    if (props.topTen) {
        return (
            <div>
                <h4 className='text-white text-center'>Top 10 score</h4>
                <table className="table table-bordered table-sm table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>{props.topTen[0].player}</td>
                        <td>{props.topTen[0].score}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{props.topTen[1].player}</td>
                        <td>{props.topTen[1].score}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{props.topTen[2].player}</td>
                        <td>{props.topTen[2].score}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>{props.topTen[3].player}</td>
                        <td>{props.topTen[3].score}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>{props.topTen[4].player}</td>
                        <td>{props.topTen[4].score}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>{props.topTen[5].player}</td>
                        <td>{props.topTen[5].score}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>{props.topTen[6].player}</td>
                        <td>{props.topTen[6].score}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>{props.topTen[7].player}</td>
                        <td>{props.topTen[7].score}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>{props.topTen[8].player}</td>
                        <td>{props.topTen[8].score}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>{props.topTen[9].player}</td>
                        <td>{props.topTen[9].score}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <h4 className='text-white text-center'>Top 10 score</h4>
                <table className="table table-bordered table-sm table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>one</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>two</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>three</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>four</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>five</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>six</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>seven</td>
                        <td>70</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>eight</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>nine</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>ten</td>
                        <td>99</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RecordTable;