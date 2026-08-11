# Support Operations Systems Portfolio

Harvey-specific public portfolio for Dans Huang's Support Operations Engineer
application. It is a hiring-manager case study, not a code sample or an export
of Positive Grid systems.

The narrative is intentionally system-first: what Dans built, production
evidence, ticket flow, safety and incident discipline, team operating model,
then transfer to Harvey.

## What is here

- `index.html` - the complete case study and synthetic interactive demo
- `styles.css` - standalone responsive design
- `script.js` - progressive reveal, active navigation, and demo state
- `assets/dans-huang-resume.pdf` - the current Harvey-targeted resume

The four production-component cards include optional technical disclosures.
They are deliberately progressive: the closed state explains the operational
job; the expanded state explains the failure mode, implementation decision, and
validation evidence. Hover is only an affordance - every note must remain
available by click, tap, and keyboard.

## Preview

Run a static server from this directory, then open the local URL:

```bash
python3 -m http.server 8088
```

## Confidentiality boundary

The page contains no customer data, real ticket IDs, colleague names,
credentials, internal URLs, proprietary source code, or raw internal
screenshots. All interactive ticket data is synthetic.

This public repository intentionally contains only the portfolio, its front-end
assets, and the resume. The evidence ledger, claim review, and publication
checklist remain private.
