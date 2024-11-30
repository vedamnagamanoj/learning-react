import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? "answer" : ""} ${
            hasAnswered
              ? idx === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
          disabled={hasAnswered}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
