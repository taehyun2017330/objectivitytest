import React from 'react';
import './ResultsPage.css';

function ResultsPage({ experimentData }) {

  const handleDownload = () => {
    const dataStr = JSON.stringify(experimentData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `experiment-results-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="results-container">
      <div className="results-card">
        <div className="completion-icon">✓</div>
        <h1>Experiment Complete!</h1>
        <p className="thank-you">
          Thank you for participating in this research study.
        </p>

        <div className="actions-section">
          <button className="download-button" onClick={handleDownload}>
            <span className="button-icon">⬇</span>
            Download Results
          </button>

          <div className="note">
            <p>
              Please download your results and email the JSON file to the researcher.
              Your data will be used for research purposes only and will remain anonymous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
