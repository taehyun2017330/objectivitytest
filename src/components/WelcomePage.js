import React from 'react';
import './WelcomePage.css';

function WelcomePage({ onStart }) {

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>LLM Output Subjectivity Experiment</h1>

        <div className="instructions">
          <h2>Welcome to the Experiment</h2>

          <p>
            In this study, we will show you <strong>simulated AI assistant responses</strong> to
            predetermined questions. We are investigating how different styles of AI outputs might
            influence your judgment and decision-making.
          </p>

          <h3>What You Will Do:</h3>
          <ul>
            <li>You will see <strong>10 trials</strong></li>
            <li>Each trial shows a user question and an AI assistant's response</li>
            <li>You will <strong>judge how subjective</strong> you think the AI's answer is</li>
            <li>Then you'll see a <strong>fictional decision scenario</strong> based on that answer</li>
            <li>You'll decide whether you would <strong>rely on that AI output</strong> for the decision</li>
          </ul>

          <h3>Important Notes:</h3>
          <ul>
            <li>There are <strong>no right or wrong answers</strong> - we want your honest judgment</li>
            <li>You cannot type - you will only need to read and respond to what's shown</li>
            <li>The experiment takes approximately <strong>10-15 minutes</strong></li>
          </ul>

          <div className="consent">
            <p>
              By clicking "Start Experiment" below, you consent to participate in this research study.
              Your responses will be used for research purposes only and will remain anonymous.
            </p>
          </div>
        </div>

        <button className="start-button" onClick={onStart}>
          Start Experiment
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
