import React, { useState, useEffect } from 'react';
import './ExperimentInterface.css';
import ChatInterface from './ChatInterface';
import ScenarioDecision from './ScenarioDecision';
import Demographics from './Demographics';

const TOTAL_TRIALS = 12;

function ExperimentInterface({ stimuli, onComplete }) {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [stage, setStage] = useState('chat'); // 'chat', 'scenario', 'demographics'
  const [trialData, setTrialData] = useState([]);
  const [selectedStimuli, setSelectedStimuli] = useState([]);
  const [currentRating, setCurrentRating] = useState(null);

  // Select random stimuli on mount
  useEffect(() => {
    if (stimuli.length > 0) {
      selectRandomStimuli();
    }
  }, [stimuli]);

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

    // Randomly select TOTAL_TRIALS unique items
    const shuffled = [...baseIds].sort(() => Math.random() - 0.5);
    const selectedIds = shuffled.slice(0, TOTAL_TRIALS);

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
    if (currentTrial + 1 < TOTAL_TRIALS) {
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

  if (selectedStimuli.length === 0) {
    return (
      <div className="experiment-loading">
        <div className="loading-spinner"></div>
        <p>Loading experiment...</p>
      </div>
    );
  }

  const currentStimulus = selectedStimuli[currentTrial];

  return (
    <div className="experiment-container">
      {stage !== 'demographics' && (
        <div className="progress-bar">
          <div className="progress-info">
            Trial {currentTrial + 1} of {TOTAL_TRIALS}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((currentTrial + 1) / TOTAL_TRIALS) * 100}%` }}
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
    </div>
  );
}

export default ExperimentInterface;
