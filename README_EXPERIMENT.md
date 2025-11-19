# LLM Subjectivity Experiment Web App

A React-based web application for conducting research on how different AI output framings influence human judgment and decision-making.

## Quick Start

```bash
cd llm-experiment-app
npm install
cp ../regenerated_stimuli.csv public/
npm start
```

Visit http://localhost:3000

## Deploy to GitHub Pages

```bash
# Update package.json homepage field first
npm run deploy
```

## Features

- Chat-like interface with typing animation
- 7-point Likert scale for subjectivity rating  
- Decision scenarios to test AI reliance
- JSON data export
- EmailJS integration
- 18 trials per participant

See full documentation in README_EXPERIMENT.md
