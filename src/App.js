import React, { Component } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isQuiz: false,
      isResult: false,
      playAgain: false,
      startTime: "",
      endTime: "",
      totalTime: "",
    }
    this.startQuizHandler = this.startQuizHandler.bind(this);
    this.result = this.result.bind(this);
    this.quizComplete = this.quizComplete.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  result(score) {
    this.setState({
      score,
    })
  }

  quizComplete(quizComplete) {
    var time = new Date().getTime();
    this.setState({
      quizComplete,
      endTime: time,
    })
  }

  playAgain() {
    console.log("Play again")
    this.setState({
      isQuiz: false,
      quizComplete: false,
    })
  }

  startQuizHandler() {
    var time = new Date().getTime();
    console.log("starting time", time);
    this.setState({
      isQuiz: true,
      startTime: time,
    })
  }

  render() {
    let totalTime = Math.floor((this.state.endTime - this.state.startTime));
    console.log("Total time taken: ", this.state.totalTime)
    console.log("Ending time: ", this.state.endTime)
    console.log("score in app js", this.state.score);
    const { isQuiz, quizComplete } = this.state;
    return (
      <div className="App">
        {!isQuiz && <button className="startQuiz" onClick={this.startQuizHandler}>
          Start Quiz
        </button>}
        {!quizComplete && isQuiz && <Quiz result={this.result} quizComplete={this.quizComplete} />}
        {quizComplete && isQuiz && <Result result={this.state.score} playAgain={this.playAgain} totalTime={totalTime} />}
      </div>
    );
  }
}

export default App;
