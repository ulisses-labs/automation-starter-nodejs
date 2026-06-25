# Automation Starter Node.js

A small public portfolio project from Ulisses Labs that demonstrates a practical Node.js automation for cleaning lead data from a CSV file and generating a Markdown report.

This repository is a demonstrative case for small automation, data cleanup, CSV organization, operational reporting and simple Node.js scripts. It uses only fictitious sample data.

## Problem

Small teams often collect leads from multiple sources and end up with duplicated records, invalid e-mails and no quick summary of the data. This creates manual review work before the list can be used in a CRM, spreadsheet or outreach workflow.

## Flow

```text
examples/input/leads.csv
↓
src/index.js
↓
examples/output/clean-leads.csv
examples/output/report.md
```

## Install

```bash
npm install
```

The project has no external runtime dependencies. Running `npm install` is optional for the current version, but it keeps the workflow familiar for Node.js projects.

## Run

```bash
npm start
```

The script reads `examples/input/leads.csv`, removes duplicated leads by e-mail, ignores records with invalid e-mails, counts leads by status and source, and writes the output files.

## Generated Files

- `examples/output/clean-leads.csv`: clean CSV with valid, unique leads.
- `examples/output/report.md`: Markdown report with summary metrics and grouped counts.

## Business Usage Example

A small business receives lead lists from a website form, LinkedIn outreach and manual entries. Before importing the list into a CRM, a lightweight automation can remove duplicates, detect invalid e-mails and generate a simple report for the operations team.

This type of script can reduce repetitive spreadsheet cleanup, improve data quality and make small workflows more reliable.

## Limitations

- The CSV parser is intentionally simple and designed for small operational files.
- It does not connect to CRMs, databases, APIs or e-mail tools.
- It does not validate whether an e-mail inbox really exists.
- It does not process personal or sensitive real data in this demonstration.

## Security and Privacy Principles

- Use fictitious data in public examples.
- Do not commit real customer information.
- Keep secrets and credentials out of the repository.
- Review input files before using automation with real business data.
- Prefer minimal data processing and clear output files.

## Possible Next Steps

- Add configurable input and output paths.
- Export a JSON summary for other tools.
- Add tests for the CSV cleanup rules.
- Add optional validation rules per business workflow.
- Package the script as a reusable internal operations tool.

## Portfolio Note

This is a public portfolio demonstration by Ulisses Labs. It is intentionally small, readable and focused on a realistic automation scenario that can be adapted into a scoped freelancer service.
