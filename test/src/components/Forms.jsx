import React, { Component } from "react";
import LoadingPage from "./LoadingPage";
import questions from "../data/questions";
import Recommendationss from "./recomendation";
import "./Forms.css";
class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      currentPage: 0,
      isSaving: false,
      isLoadingRecommendations: false,
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
          
          this.setState({ isLoadingRecommendations: true });

          return fetch("http://localhost:3000/recomendationss");
        } else {
          console.log("Ошибка при сохранении ответов на сервере.");
        }
      })
      .then((response) => response.json())
      .then((recomendationss) => {
        console.log("Рекомендации успешно загружены:", recomendationss);
        
        this.setState({
          isLoadingRecommendations: false,
          recomendationss,
        });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке рекомендаций:", error);
      })
      .finally(() => {
        this.setState({ isSaving: false });
        this.setState({ isLoadingRecommendations: true });
        
      });
  };

  // ... (остальной код)
  handlePageChange = (pageChange) => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + pageChange,
    }));
  };

  render() {
    const { selectedGroup } = this.props;
    const { isSaving, isLoadingRecommendations, recomendationss } = this.state;

    if (isSaving) {
      return( <LoadingPage/> );
    }

    if (isLoadingRecommendations) {
      return <Recommendationss />;
    }

    const questionsList = questions[selectedGroup];
    const { currentPage } = this.state;
    const questionsPerPage = 5;
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const visibleQuestions = questionsList.slice(startIndex, endIndex);

    return (
      <div className="answer">
        {/* <h2>Suallar:</h2> */}
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

        <div className="buttons">
          <button
            onClick={() => this.handlePageChange(-1)}
            disabled={currentPage === 0}
          >
            Əvvəlki
          </button>
          {endIndex >= questionsList.length ? (
            <button onClick={this.saveAnswersToServer}>Təsdiqlə</button>
          ) : (
            <button
              onClick={() => this.handlePageChange(1)}
              disabled={endIndex >= questionsList.length}
            >
              Növbəti
            </button>
          )}
        </div>
      </div>
      
    );
  }
}

export default Forms;

