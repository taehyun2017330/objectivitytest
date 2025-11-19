import React, { useState, useEffect } from 'react';
import './ChatInterface.css';

function ChatInterface({ question, answer, onComplete }) {
  const [showThinking, setShowThinking] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    // Start sequence when component mounts
    startSequence();
  }, []);

  const startSequence = async () => {
    // Brief pause before showing thinking
    await delay(500);
    setShowThinking(true);

    // Show thinking animation briefly
    await delay(800);
    setShowThinking(false);

    // Start typing animation
    setIsTyping(true);
    await typeAnswer();

    // Show rating scale
    setShowRating(true);
  };

  const typeAnswer = async () => {
    const words = answer.split(' ');
    for (let i = 0; i < words.length; i++) {
      setDisplayedAnswer(words.slice(0, i + 1).join(' '));
      // Random delay between 30-80ms per word for natural typing
      await delay(Math.random() * 50 + 30);
    }
    setIsTyping(false);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleRatingSubmit = () => {
    if (rating !== null) {
      onComplete(rating);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-container">
        <div className="chat-messages">
          {/* User Message - now on the right */}
          <div className="message user-message">
            <div className="message-content">
              <div className="message-text">{question}</div>
            </div>
            <div className="message-avatar user-avatar">U</div>
          </div>

          {/* AI Message - now on the left */}
          <div className="message ai-message">
            <div className="message-avatar ai-avatar">AI</div>
            <div className="message-content">
              {showThinking && (
                <div className="thinking-indicator">
                  <div className="thinking-dot"></div>
                  <div className="thinking-dot"></div>
                  <div className="thinking-dot"></div>
                </div>
              )}
              {displayedAnswer && (
                <div className="message-text">
                  {displayedAnswer}
                  {isTyping && <span className="cursor">|</span>}
                </div>
              )}
            </div>
          </div>

          {/* Rating Scale - appears naturally in chat after AI response */}
          {showRating && (
            <div className="rating-in-chat">
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
                <p><strong>1-2:</strong> Very subjective (opinions, feelings, "I think...")</p>
                <p><strong>3-5:</strong> Somewhat mixed (some facts, some opinions)</p>
                <p><strong>6-7:</strong> Very objective (facts, specifications, data)</p>
              </div>

              <button
                className="submit-rating-button"
                onClick={handleRatingSubmit}
                disabled={rating === null}
              >
                Submit Rating
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
