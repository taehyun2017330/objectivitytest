import React, { useState } from 'react';
import './ScenarioDecision.css';

function ScenarioDecision({ scenario, answer, onSubmit }) {
  const [decision, setDecision] = useState(null);

  const handleSubmit = () => {
    if (decision !== null) {
      onSubmit(decision);
    }
  };

  // Parse scenario to extract context and decision point
  const parseScenario = () => {
    // Split by ANSWER_PLACEHOLDER
    const parts = scenario.split('ANSWER_PLACEHOLDER');

    if (parts.length === 2) {
      let beforeAnswer = parts[0].trim();
      let afterAnswer = parts[1].trim();

      // Remove common phrases that introduce the answer
      beforeAnswer = beforeAnswer
        .replace(/,?\s*(and\s+)?(it\s+)?(replies|responds|says|answers):?\s*$/i, '')
        .replace(/,?\s*you\s+(see|read|receive|get):?\s*$/i, '')
        .replace(/,?\s*which\s+responds\s+with:?\s*$/i, '')
        .trim();

      // Remove leading punctuation from afterAnswer
      afterAnswer = afterAnswer
        .replace(/^\.\s*/, '') // Remove leading period
        .replace(/^,\s*/, '')  // Remove leading comma
        .trim();

      return { context: beforeAnswer, decisionText: afterAnswer };
    }

    // Fallback if ANSWER_PLACEHOLDER not found
    return { context: scenario, decisionText: '' };
  };

  const { context, decisionText } = parseScenario();

  return (
    <div className="scenario-container">
      <div className="scenario-card">
        <h2>Decision Scenario</h2>

        <div className="scenario-context">
          <p>{context}</p>
        </div>

        {/* AI Response in chat bubble style */}
        <div className="ai-response-section">
          <div className="message ai-message">
            <div className="message-avatar ai-avatar">AI</div>
            <div className="message-content">
              <div className="message-text">{answer}</div>
            </div>
          </div>
        </div>

        {/* Highlighted decision task */}
        {decisionText && (
          <div className="decision-highlight">
            <div className="decision-task-label">Decision Task:</div>
            <p>{decisionText}</p>
          </div>
        )}

        <div className="decision-section">
          <p className="decision-prompt">
            Would you rely on this AI response to make this decision?
          </p>

          <div className="decision-buttons">
            <button
              className={`decision-button ${decision === 'yes' ? 'selected' : ''}`}
              onClick={() => setDecision('yes')}
            >
              <span className="decision-icon">✓</span>
              Yes, I would rely on it
            </button>

            <button
              className={`decision-button ${decision === 'no' ? 'selected' : ''}`}
              onClick={() => setDecision('no')}
            >
              <span className="decision-icon">✗</span>
              No, I would not rely on it
            </button>
          </div>
        </div>

        <button
          className="submit-decision-button"
          onClick={handleSubmit}
          disabled={decision === null}
        >
          Continue to Next Trial
        </button>
      </div>
    </div>
  );
}

export default ScenarioDecision;
