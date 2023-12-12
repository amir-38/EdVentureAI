import React, { Component } from "react";
import LoadingPage from "./LoadingPage";
import questions from "../data/questions";

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      currentPage: 0,
      isSaving: false,
    };
  }

  handleAnswerChange = (event, question) => {
    const { answers } = this.state;
    const { selectedGroup } = this.props;

    if (!answers[selectedGroup]) {
      answers[selectedGroup] = {};
    }
    answers[selectedGroup][question] = event.target.value;
    this.setState({ answers });
  };

  saveAnswersToServer = () => {
    const { answers } = this.state;
    const { selectedGroup } = this.props;
  
    const groupId = questions[selectedGroup].id;
  
    this.setState({ isSaving: true });
  
    fetch("http://localhost:3000/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId,
        answers: answers[selectedGroup],
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Ответы успешно сохранены на сервере.");
        } else {
          console.error("Ошибка при сохранении ответов на сервере.");
        }
      })
      .finally(() => {
        this.setState({ isSaving: false });
      });
  };
  
  

  handlePageChange = (pageChange) => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + pageChange,
    }));
  };

  render() {
    const { selectedGroup } = this.props;
    const { isSaving } = this.state;

    if (isSaving) {
      return  <LoadingPage />;
    }

    const questionsList = questions[selectedGroup];
    const { currentPage } = this.state;
    const questionsPerPage = 5;
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const visibleQuestions = questionsList.slice(startIndex, endIndex);

    return (
      <div>
        <h2>Вопросы:</h2>
        <ul>
          {visibleQuestions.map((question, index) => (
            <li key={startIndex + index}>
              {question}
              <textarea
              required
                value={
                  (this.state.answers[selectedGroup] &&
                    this.state.answers[selectedGroup][question]) ||
                  ""
                }
                onChange={(event) => this.handleAnswerChange(event, question)}
              />
            </li>
          ))}
        </ul>

        <div>
          <button
            onClick={() => this.handlePageChange(-1)}
            disabled={currentPage === 0}
          >
            Предыдущая страница
          </button>
          {endIndex >= questionsList.length ? (
            <button onClick={this.saveAnswersToServer}>Сохранить ответы</button>
          ) : (
            <button
              onClick={() => this.handlePageChange(1)}
              disabled={endIndex >= questionsList.length}
            >
              Следующая страница
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Forms;



// {
//   "answers": null,
//   "recomendationss": [
//     {
//       "id": 2,
//       "body":"hello",
//       "postId": 1
//     }
//   ]
// }