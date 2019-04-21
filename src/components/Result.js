import React, { Component } from 'react';
import '../App.css';

class Result extends Component {
    constructor() {
        super();
        this.state = {
            correctAns: 0,
            score: 0,
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log("props in result", props)
        console.log("state in result", state)
        return {
            correctAns: props.result,
            score: props.result * 10,
        }
    }

    componentDidMount() {
        console.log("props", this.props)
        this.setState({
            // correctAns: this.props.correctAns,
            // score: this.props.correctAns * 10,
        })
    }
    render() {
        console.log("score in result js", this.state.score)
        return (
            <div className="Result">
                Correct Ans: {this.state.correctAns}
                <br />
                Score: {this.state.score}
                <br />
                Total time taken: {((this.props.totalTime) / 60000).toFixed(2) + " minutes"}
                <br />
                <button onClick={this.props.playAgain}>Play again</button>
            </div>
        )
    }
}

export default Result;