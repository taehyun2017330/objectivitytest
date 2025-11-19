# Quick Setup Guide for 5-Variant Experiment

## What Changed

The experiment now uses **5 answer variants** instead of 4:

1. **subjective_experience** - Pure personal opinion ("I think...", "feels to me...")
2. **social_experience** - Crowd wisdom ("Many users say...", "Reviews mention...")
3. **spec_neutral** - Balanced technical ("generally", "tends to", mild hedging)
4. **spec_assertive** - Confident factual ("clearly", "objectively", "superior")
5. **overprecise_pseudofactual** - Fake hyperconfidence ("35% more", "tests show", made-up stats)

## CSV Format

Your new CSV should be named: `final_stimuli_5variants.csv`

Expected columns:
- `item_id` - e.g., "item_0000"
- `variant_type` - One of the 5 types above
- `question` - The anonymized question text
- `answer` - The AI response for this variant
- `scenario` - Decision scenario with answer embedded

## Setup Steps

1. **Copy your generated CSV:**
```bash
cd llm-experiment-app
cp ../final_stimuli_5variants.csv public/
```

2. **Install and run:**
```bash
npm install
npm start
```

3. **Test locally:**
- Visit http://localhost:3000
- Go through a few trials to verify everything works
- Check that all 5 variant types appear

## What the App Does

- Loads your CSV on startup
- Randomly selects 18 unique questions (items)
- For each question, randomly picks ONE of the 5 variants
- Shows chat interface with typing animation
- Collects subjectivity rating (1-7 Likert scale)
- Shows decision scenario
- Collects reliance decision (yes/no)
- Exports all data as JSON

## Expected Output Format

Each trial records:
```json
{
  "trial": 1,
  "item_id": "item_0000",
  "variant_type": "spec_assertive",
  "question": "Which device...",
  "answer": "The Zenith Pro clearly...",
  "subjectivity_rating": 6,
  "timestamp_subjectivity": "2025-01-19T...",
  "reliance_decision": "yes",
  "timestamp_reliance": "2025-01-19T..."
}
```

## Troubleshooting

### CSV not loading
- Make sure the file is named exactly `final_stimuli_5variants.csv`
- Check it's in the `public` folder
- Open browser console (F12) to see error messages

### Wrong number of trials showing
- Should show 18 trials total
- Each trial should have a different question
- Variants are randomly selected per trial

### Deployment
Once your CSV generation finishes:
1. Copy CSV to public folder
2. Update GitHub username in package.json
3. Run `npm run deploy`

## Next Steps

1. Wait for your Python script to finish generating the CSV
2. Copy the CSV to the public folder as shown above
3. Test locally with `npm start`
4. If everything works, deploy to GitHub Pages

Questions? Check the browser console for errors.
