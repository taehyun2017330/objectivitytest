import React, { useState } from 'react';
import './SubjectivityScale.css';

function SubjectivityScale({ question, answer, onSubmit }) {
  const [rating, setRating] = useState(null);

  const handleSubmit = () => {
    if (rating !== null) {
      onSubmit(rating);
    }
  };

  return (
    <div className="subjectivity-container">
      <div className="subjectivity-card">
        <h2>Rate the Subjectivity</h2>

        <div className="context-reminder">
          <p><strong>Question:</strong> {question}</p>
          <div className="answer-box">
            <strong>AI Response:</strong>
            <p>{answer}</p>
          </div>
        </div>

        <div className="rating-section">
          <p className="rating-prompt">
            How subjective or objective do you think this AI response is?
          </p>

          <div className="likert-scale">
            <div className="scale-label">Very Subjective</div>
            <div className="scale-buttons">
              {[1, 2, 3, 4, 5, 6, 7].map(value => (
                <button
                  key={value}
                  className={`scale-button ${rating === value ? 'selected' : ''}`}
                  onClick={() => setRating(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="scale-label">Very Objective</div>
          </div>

          <div className="scale-description">
            <p>
              <strong>1-2:</strong> Very subjective (opinions, feelings, "I think...")
            </p>
            <p>
              <strong>3-5:</strong> Somewhat mixed (some facts, some opinions)
            </p>
            <p>
              <strong>6-7:</strong> Very objective (facts, specifications, data)
            </p>
          </div>
        </div>

        <button
          className="submit-rating-button"
          onClick={handleSubmit}
          disabled={rating === null}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}

export default SubjectivityScale;
