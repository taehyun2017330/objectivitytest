import React, { useState } from 'react';
import './Demographics.css';

function Demographics({ onComplete }) {
  const [formData, setFormData] = useState({
    age: '',
    education: '',
    ai_usage_frequency: '',
    trust_in_ai: '',
    tech_savviness: '',
    decision_style: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    // Check if all fields are filled
    const allFilled = Object.values(formData).every(value => value !== '');
    if (!allFilled) {
      alert('Please answer all questions before continuing.');
      return;
    }
    onComplete(formData);
  };

  return (
    <div className="demographics-container">
      <div className="demographics-content">
        <h2>Demographic Information</h2>
        <p className="demographics-intro">
          Please answer the following questions about yourself. This information helps us understand how different people interact with AI systems.
        </p>

        <div className="demographics-form">
          {/* Age */}
          <div className="demographic-question">
            <label className="question-label">1. Age</label>
            <div className="radio-group">
              {['18-24', '25-34', '35-44', '45-54', '55-64', '65+'].map(option => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="age"
                    value={option}
                    checked={formData.age === option}
                    onChange={(e) => handleChange('age', e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Education Level */}
          <div className="demographic-question">
            <label className="question-label">2. Education Level</label>
            <div className="radio-group">
              {[
                'High school or less',
                'Some college',
                'Bachelor\'s degree',
                'Graduate degree'
              ].map(option => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="education"
                    value={option}
                    checked={formData.education === option}
                    onChange={(e) => handleChange('education', e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Frequency of AI Tool Usage */}
          <div className="demographic-question">
            <label className="question-label">3. Frequency of AI Tool Usage</label>
            <div className="radio-group">
              {['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'].map(option => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="ai_usage_frequency"
                    value={option}
                    checked={formData.ai_usage_frequency === option}
                    onChange={(e) => handleChange('ai_usage_frequency', e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Trust in AI Advice */}
          <div className="demographic-question">
            <label className="question-label">4. How much do you trust AI advice?</label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>Not at all</span>
                <span>Completely</span>
              </div>
              <div className="scale-buttons">
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <label key={num} className="scale-option">
                    <input
                      type="radio"
                      name="trust_in_ai"
                      value={num}
                      checked={formData.trust_in_ai === num.toString()}
                      onChange={(e) => handleChange('trust_in_ai', e.target.value)}
                    />
                    <span className="scale-number">{num}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Self-rated Tech Savviness */}
          <div className="demographic-question">
            <label className="question-label">5. Self-rated Tech Savviness</label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>Not tech-savvy</span>
                <span>Very tech-savvy</span>
              </div>
              <div className="scale-buttons">
                {[1, 2, 3, 4, 5].map(num => (
                  <label key={num} className="scale-option">
                    <input
                      type="radio"
                      name="tech_savviness"
                      value={num}
                      checked={formData.tech_savviness === num.toString()}
                      onChange={(e) => handleChange('tech_savviness', e.target.value)}
                    />
                    <span className="scale-number">{num}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* General Decision-making Style */}
          <div className="demographic-question">
            <label className="question-label">6. General Decision-making Style</label>
            <div className="radio-group">
              {[
                'I usually decide quickly with available information',
                'I prefer to gather some information, then decide fairly quickly',
                'I usually research thoroughly before deciding',
                'I tend to seek expert advice or validation before deciding',
                'It depends on the situation'
              ].map(option => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="decision_style"
                    value={option}
                    checked={formData.decision_style === option}
                    onChange={(e) => handleChange('decision_style', e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="submit-demographics-button" onClick={handleSubmit}>
            Continue to Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default Demographics;
