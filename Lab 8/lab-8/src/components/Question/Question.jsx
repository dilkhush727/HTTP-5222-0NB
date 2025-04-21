import { useEffect, useState } from "react";
import "./question.css"

const Question = () => {
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&type=boolean")
      .then((res) => res.json())
      .then((data) => {
        const q = data.results[0];
        setCategory(q.category);
        setQuestion(q.question);
        setAnswer(q.correct_answer);
      });
  }, []);

  return (
    <>
      <div>
        <h2>Welcome to Trivia</h2>
        <small>Here is your random question,</small>
        <p><strong>True or false:</strong></p>
      </div>
        <div className="question">
          <span className="category">{category}</span>
          <h3 dangerouslySetInnerHTML={{ __html: question }}></h3>
          {revealed && <div className="answer"><strong>{answer}</strong></div>}
          <button type="button" className="btn-reveal" onClick={() => setRevealed(true)}>
            Reveal answer
          </button>
        </div>
    </>
  );
};

export default Question;
