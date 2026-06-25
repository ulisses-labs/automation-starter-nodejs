# Service Case: Lead CSV Cleanup Automation

## Fictional Scenario

A small consulting company receives leads from a website form, LinkedIn messages, Instagram campaigns and manual spreadsheet entries.

The team wants to review the list before importing it into a CRM, but the CSV often contains duplicated contacts, missing e-mails and invalid e-mail formats.

## Problem

The operations team spends time checking the spreadsheet manually. This creates delays, inconsistent cleanup rules and a higher chance of importing bad data into business tools.

## Proposed Solution

Create a small Node.js automation that reads a CSV file of leads, removes duplicated records by e-mail, filters invalid e-mails and generates a clean CSV plus a Markdown report.

The goal is not to build a large system. The goal is to automate one repetitive operational task with a clear input, clear processing rules and clear outputs.

## Input

The input is a CSV file with the following columns:

- `name`
- `email`
- `status`
- `source`

Example path:

```text
examples/input/leads.csv
```

## Processing

The automation:

- reads the CSV file;
- validates required columns;
- normalizes e-mail addresses;
- removes duplicated leads by e-mail;
- excludes records without a valid e-mail;
- counts clean leads by status;
- counts clean leads by source.

## Output

The automation generates:

- `examples/output/clean-leads.csv`: a clean list with valid and unique leads;
- `examples/output/report.md`: a simple report with totals and grouped counts.

## Business Value

This automation helps the team:

- reduce manual spreadsheet cleanup;
- improve data quality before CRM import;
- document cleanup results;
- identify which lead sources are present in the file;
- repeat the same process with consistent rules.

## Suggested Fixed Scope

A freelancer package could include:

- review of the current CSV format;
- implementation of one cleanup script;
- generation of one clean output file;
- generation of one summary report;
- setup instructions in a README;
- one short handoff session or recorded walkthrough.

## Out of Scope

The first version should not include:

- CRM integration;
- database storage;
- frontend dashboard;
- user login;
- live e-mail verification;
- automated outreach;
- processing of sensitive production data in a public repository.

## Freelancer Package

This could become a small fixed-price service for businesses that need to clean recurring operational spreadsheets.

Package example:

```text
CSV cleanup automation for one workflow
Delivery: Node.js script, documentation and sample output
Timeline: 2 to 5 business days, depending on file rules
```

The package can later expand into integrations, scheduled runs or internal reporting when the client has a clear operational need.
