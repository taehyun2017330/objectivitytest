# ✅ Ready to Test!

Your React app is now configured to work with the wide-format CSV.

## What Was Updated

1. **CSV Loading** - App now reads `final_stimuli_5variants_wide.csv`
2. **Wide to Long Conversion** - Automatically expands each row into 5 variants
3. **Scenario Substitution** - Replaces `ANSWER_PLACEHOLDER` with actual answers
4. **Console Logging** - Shows loading progress in browser console

## Current Status

✅ CSV copied to public folder: `final_stimuli_5variants_wide.csv`
✅ App configured to load wide format
✅ Variant expansion logic implemented
✅ Scenario placeholder replacement working

## To Run The Experiment

```bash
cd "/Users/taehyun/Downloads/FSQD-Json-dataset (1)/llm-experiment-app"
npm start
```

Then:
1. Open http://localhost:3000
2. Press F12 to open browser console
3. Look for: "✓ Loaded X questions from CSV"
4. Click "Start Experiment"
5. Go through a few trials to test

## What to Check

### In Browser Console:
```
✓ Loaded 24 questions from CSV
✓ Expanded to 120 stimuli (24 × 5 variants)
```

### During Experiment:
- [ ] Questions appear correctly
- [ ] Answers show different styles (subjective vs assertive vs pseudofactual)
- [ ] Scenarios make sense with embedded answers
- [ ] Likert scale works (1-7)
- [ ] Reliance decision works (yes/no)
- [ ] Progress bar shows Trial X of 18

### At End:
- [ ] Results page shows
- [ ] Download JSON button works
- [ ] Email form appears

## Expected Data Structure

Your CSV has these columns:
```
item_id
question
answer_subjective_experience
answer_social_experience
answer_spec_neutral
answer_spec_assertive
answer_overprecise_pseudofactual
scenario_template
```

The app converts this to:
```javascript
{
  item_id: "item_0000",
  variant_type: "spec_assertive",
  question: "What device has more...",
  answer: "The Zenith 30 Pro clearly...",
  scenario: "You're about to sign up for... The Zenith 30 Pro clearly..."
}
```

## Troubleshooting

### CSV not loading?
- Check: Is the file in `public/` folder?
- Check: Is it named exactly `final_stimuli_5variants_wide.csv`?
- Check browser console for errors

### Answers look wrong?
- Verify `ANSWER_PLACEHOLDER` is in your scenario_template
- Check that it's spelled exactly right (case-sensitive)

### Not seeing 5 different styles?
- Each trial randomly picks 1 of 5 variants
- Try multiple trials to see variety
- Check console log confirms 120 stimuli (24 × 5)

## Next Steps

1. **Test locally** - Make sure everything works
2. **Review a few trials** - Check answer quality
3. **Download test JSON** - Verify data format
4. **Configure EmailJS** (optional) - See ResultsPage.js
5. **Deploy to GitHub Pages** - When ready

## Deployment Checklist

Before deploying:
- [ ] Test full experiment flow (all 18 trials)
- [ ] Verify JSON download works
- [ ] Update GitHub username in package.json
- [ ] Set EmailJS credentials (if using)
- [ ] Test on mobile browser too

Then run:
```bash
npm run deploy
```

Your experiment will be live at:
`https://YOUR-USERNAME.github.io/llm-experiment-app`

---

**Status**: App is ready to test! Run `npm start` and check it out.
