import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import WelcomePage from './components/WelcomePage';
import ExperimentInterface from './components/ExperimentInterface';
import ResultsPage from './components/ResultsPage';

function App() {
  const [stage, setStage] = useState('welcome'); // 'welcome', 'experiment', 'results'
  const [experimentData, setExperimentData] = useState([]);
  const [stimuli, setStimuli] = useState([]);

  // Load CSV data when app mounts
  useEffect(() => {
    loadStimuliData();
  }, []);

  const loadStimuliData = async () => {
    try {
      // Load the wide-format CSV from public folder
      const response = await fetch(`${process.env.PUBLIC_URL}/final_stimuli_5variants_wide.csv`);
      const csvText = await response.text();

      // Use PapaParse to properly handle quoted fields
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsed = results.data;

          // Transform wide format to long format (expand variants)
          const expanded = [];

          parsed.forEach((row, idx) => {
            // Skip empty rows
            if (!row.item_id || !row.question) {
              return;
            }

            const variants = [
              { type: 'subjective_experience', answer: row.answer_subjective_experience },
              { type: 'social_experience', answer: row.answer_social_experience },
              { type: 'spec_neutral', answer: row.answer_spec_neutral },
              { type: 'spec_assertive', answer: row.answer_spec_assertive },
              { type: 'overprecise_pseudofactual', answer: row.answer_overprecise_pseudofactual }
            ];

            variants.forEach(variant => {
              // Check if scenario_template exists
              if (!row.scenario_template) {
                return;
              }

              // Keep the scenario_template with ANSWER_PLACEHOLDER intact
              // ScenarioDecision component will handle displaying the answer separately
              expanded.push({
                item_id: row.item_id,
                variant_type: variant.type,
                question: row.question,
                answer: variant.answer,
                scenario: row.scenario_template
              });
            });
          });

          setStimuli(expanded);
        },
        error: (error) => {
          // Error parsing CSV
        }
      });
    } catch (error) {
      // Error loading stimuli
    }
  };

  const handleStartExperiment = () => {
    setStage('experiment');
  };

  const handleExperimentComplete = (data) => {
    setExperimentData(data);
    setStage('results');
  };

  return (
    <div className="App">
      {stage === 'welcome' && (
        <WelcomePage onStart={handleStartExperiment} />
      )}
      {stage === 'experiment' && (
        <ExperimentInterface
          stimuli={stimuli}
          onComplete={handleExperimentComplete}
        />
      )}
      {stage === 'results' && (
        <ResultsPage experimentData={experimentData} />
      )}
    </div>
  );
}

export default App;
