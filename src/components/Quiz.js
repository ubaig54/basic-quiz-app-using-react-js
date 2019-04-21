import React, { Component } from 'react';
import '../App.css';

class Quiz extends Component {
	constructor() {
		super();
		this.state = {
			questions: [],
			currentQuestion: 0,
			correctAns: 0,
			score: 0,
			isQuiz: true,
		}
		this.next = this.next.bind(this);
		// this.sendResultToApp = this.sendResultToApp.bind(this);
	}

	componentDidMount() {
		const that = this;

		fetch('https://opentdb.com/api.php?amount=10')
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				// console.log((myJson.results));
				that.setState({
					questions: myJson.results,
				})
			});
	}

	next() {
		const { questions, currentQuestion} = this.state;
		this.setState({
			currentQuestion: currentQuestion + 1
		})
		console.log("questions: ", questions);
		console.log("currentQuestion: ", currentQuestion);
		console.log("questions[currentQuestion].correct_answer: ", questions[currentQuestion].correct_answer);

		// if (questions[currentQuestion].correct_answer === selectedOption) {
		// 	this.setState({
		// 		correctAns: correctAns + 1,
		// 		score: score + 10,
		// 	})
		// 	console.log("Right answer: ", selectedOption);
		// 	console.log("No. of correct ans: ", correctAns);
		// 	console.log("Score: ", score);
		// }

		console.log(currentQuestion, questions.length)

		if (currentQuestion === questions.length - 1) {
			console.log("END");
			this.setState({
				isQuiz: false,
			})
			this.props.quizComplete(this.state.isQuiz);
		}

		this.props.result(this.state.correctAns);
	}

	// sendResultToApp() {
	// 	this.props.result(this.state.correctAns);
	// }

	render() {
		const { questions, currentQuestion, correctAns, score } = this.state;
		// console.log('questions:', this.state.questions)
		return (
			<div className="Quiz">
				<div className="question">
					{questions.map((item, index) => {
						if (index === currentQuestion) {
							return <li key={index}>{questions[currentQuestion].question}</li>
						}
					})}
				</div>
				<div className="answers">
					{questions.map((item, index) => {
						var incorrect_answers_arr = item.incorrect_answers.map((item, index) => {
							return <div key={index}><input type="radio" name="{index}" onClick={() => this.setState({
								selectedOption: item,
							})} />
								<label>{item}</label></div>
						})
						if (index === currentQuestion) {
							return <div key={index}>
								<input type="radio" name="{index}" value={item.correct_answer} onClick={() => this.setState({
									selectedOption: item.correct_answer, correctAns: correctAns + 1, score: score + 10,
								})} />
								<label>{item.correct_answer}</label>
								{incorrect_answers_arr}
							</div>
						}
					})}
				</div>
				<button onClick={this.next}>
					Next
				</button>

				{console.log("Selected option: ", this.state.selectedOption)}
			</div>
		);
	}
}

export default Quiz;