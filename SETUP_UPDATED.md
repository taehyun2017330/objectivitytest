# Quick Setup Guide - Updated for Wide CSV Format

## CSV Format

Your CSV should be named: `final_stimuli_5variants_wide.csv`

**Wide format** with columns:
- `item_id` - e.g., "item_0000"
- `question` - The anonymized question text
- `answer_subjective_experience` - Variant 1 answer
- `answer_social_experience` - Variant 2 answer
- `answer_spec_neutral` - Variant 3 answer
- `answer_spec_assertive` - Variant 4 answer
- `answer_overprecise_pseudofactual` - Variant 5 answer
- `scenario_template` - Scenario with `ANSWER_PLACEHOLDER` that gets replaced

The app automatically:
1. Reads the wide-format CSV
2. Expands each row into 5 variants
3. Replaces `ANSWER_PLACEHOLDER` with the appropriate answer for each variant
4. Creates internal long-format data for the experiment

## Setup Steps

```bash
cd llm-experiment-app

# Copy your generated wide CSV
cp ../final_stimuli_5variants_wide.csv public/

# Install and run
npm install
npm start
```

Visit http://localhost:3000

## How It Works

For each question row in the CSV, the app creates 5 internal variants:

```
item_0000 → 5 variants created:
  - subjective_experience
  - social_experience
  - spec_neutral
  - spec_assertive
  - overprecise_pseudofactual
```

During the experiment:
- Randomly selects 18 unique questions
- For each question, randomly picks 1 of the 5 variants
- Shows that variant's answer
- Embeds it into the scenario

## Testing

1. Open browser console (F12)
2. Check that stimuli are loaded
3. Start experiment
4. Verify you see different answer styles across trials

Expected console output:
```
Loaded X rows from CSV
Expanded to Y stimuli (X * 5)
```

## Next Steps

Once the CSV is in place:
1. Test locally with `npm start`
2. Update GitHub username in package.json line 5
3. Deploy with `npm run deploy`
