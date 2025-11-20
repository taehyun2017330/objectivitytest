import React, { useState, useEffect } from 'react';
import './ExperimentInterface.css';
import ChatInterface from './ChatInterface';
import ScenarioDecision from './ScenarioDecision';
import Demographics from './Demographics';

const TOTAL_TRIALS = 10;

function ExperimentInterface({ stimuli, onComplete }) {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [stage, setStage] = useState('chat'); // 'chat', 'scenario', 'demographics'
  const [trialData, setTrialData] = useState([]);
  const [selectedStimuli, setSelectedStimuli] = useState([]);
  const [currentRating, setCurrentRating] = useState(null);
  const [showDevTools, setShowDevTools] = useState(false);

  // Select random stimuli on mount
  useEffect(() => {
    if (stimuli.length > 0) {
      selectRandomStimuli();
    }
  }, [stimuli]);

  // Dev tool keyboard shortcut (Shift + D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'D') {
        setShowDevTools(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectRandomStimuli = () => {
    // Group by item_id (which is already the base ID in the new format)
    const grouped = {};
    stimuli.forEach(item => {
      const baseId = item.item_id; // In new format, item_id is already unique per question
      if (!grouped[baseId]) {
        grouped[baseId] = [];
      }
      grouped[baseId].push(item);
    });

    // Get all unique base IDs
    const baseIds = Object.keys(grouped);

    // Use the minimum of TOTAL_TRIALS or available items
    const numToSelect = Math.min(TOTAL_TRIALS, baseIds.length);

    // Randomly select unique items
    const shuffled = [...baseIds].sort(() => Math.random() - 0.5);
    const selectedIds = shuffled.slice(0, numToSelect);

    // For each selected item, randomly choose one variant
    const selected = selectedIds.map(baseId => {
      const variants = grouped[baseId];
      const randomVariant = variants[Math.floor(Math.random() * variants.length)];
      return randomVariant;
    });

    setSelectedStimuli(selected);
  };

  const handleChatComplete = (rating) => {
    // Store the rating and move to scenario
    setCurrentRating(rating);

    const currentStimulus = selectedStimuli[currentTrial];

    setTrialData([
      ...trialData,
      {
        trial: currentTrial + 1,
        item_id: currentStimulus.item_id,
        variant_type: currentStimulus.variant_type,
        question: currentStimulus.question,
        answer: currentStimulus.answer,
        subjectivity_rating: rating,
        timestamp_subjectivity: new Date().toISOString()
      }
    ]);

    setStage('scenario');
  };

  const handleScenarioSubmit = (reliance) => {
    // Update the last trial data with reliance decision
    const updatedTrialData = [...trialData];
    updatedTrialData[updatedTrialData.length - 1] = {
      ...updatedTrialData[updatedTrialData.length - 1],
      reliance_decision: reliance,
      timestamp_reliance: new Date().toISOString()
    };

    setTrialData(updatedTrialData);

    // Move to next trial or show demographics
    if (currentTrial + 1 < selectedStimuli.length) {
      setCurrentTrial(currentTrial + 1);
      setStage('chat');
    } else {
      setStage('demographics');
    }
  };

  const handleDemographicsComplete = (demographics) => {
    // Combine trial data with demographics
    const completeData = {
      trials: trialData,
      demographics: demographics,
      completed_at: new Date().toISOString()
    };
    onComplete(completeData);
  };

  const jumpToTrial = (trialNum) => {
    if (trialNum >= 0 && trialNum < selectedStimuli.length) {
      setCurrentTrial(trialNum);
      setStage('chat');
      setShowDevTools(false);
    }
  };

  if (selectedStimuli.length === 0) {
    return (
      <div className="experiment-loading">
        <div className="loading-spinner"></div>
        <p>Loading experiment...</p>
      </div>
    );
  }

  const currentStimulus = selectedStimuli[currentTrial];

  // Safety check: if currentStimulus is undefined, show loading
  if (!currentStimulus && stage !== 'demographics') {
    return (
      <div className="experiment-loading">
        <div className="loading-spinner"></div>
        <p>Loading question {currentTrial + 1}...</p>
      </div>
    );
  }

  return (
    <div className="experiment-container">
      {stage !== 'demographics' && (
        <div className="progress-bar">
          <div className="progress-info">
            Trial {currentTrial + 1} of {selectedStimuli.length}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((currentTrial + 1) / selectedStimuli.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {stage === 'chat' && (
        <ChatInterface
          question={currentStimulus.question}
          answer={currentStimulus.answer}
          onComplete={handleChatComplete}
        />
      )}

      {stage === 'scenario' && (
        <ScenarioDecision
          scenario={currentStimulus.scenario}
          answer={currentStimulus.answer}
          onSubmit={handleScenarioSubmit}
        />
      )}

      {stage === 'demographics' && (
        <Demographics onComplete={handleDemographicsComplete} />
      )}

      {/* Dev Tools (Shift + D to toggle) */}
      {showDevTools && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 9999,
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '16px' }}>
            Dev Tools (Shift+D to close)
          </div>
          <div style={{ marginBottom: '15px', fontSize: '12px', opacity: 0.7 }}>
            Jump to any question:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {selectedStimuli.map((_, idx) => (
              <button
                key={idx}
                onClick={() => jumpToTrial(idx)}
                style={{
                  padding: '8px',
                  background: currentTrial === idx ? '#667eea' : '#444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: currentTrial === idx ? 'bold' : 'normal'
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStage('demographics')}
            style={{
              marginTop: '15px',
              padding: '10px',
              background: '#764ba2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px'
            }}
          >
            Jump to Demographics
          </button>
        </div>
      )}
    </div>
  );
}

export default ExperimentInterface;
