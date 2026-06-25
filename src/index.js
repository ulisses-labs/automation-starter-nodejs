const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "examples", "input", "leads.csv");
const outputDir = path.join(__dirname, "..", "examples", "output");
const cleanCsvPath = path.join(outputDir, "clean-leads.csv");
const reportPath = path.join(outputDir, "report.md");

const REQUIRED_COLUMNS = ["name", "email", "status", "source"];

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsv(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  const missingColumns = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));

  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(", ")}`);
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);

    return headers.reduce((record, header, index) => {
      record[header] = (values[index] || "").trim();
      return record;
    }, {});
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function incrementCounter(counter, key) {
  const normalizedKey = key || "unknown";
  counter[normalizedKey] = (counter[normalizedKey] || 0) + 1;
}

function cleanLeads(leads) {
  const seenEmails = new Set();
  const cleanRecords = [];
  const invalidRecords = [];
  const duplicateRecords = [];
  const countsByStatus = {};
  const countsBySource = {};

  for (const lead of leads) {
    const email = lead.email.toLowerCase();

    if (!isValidEmail(email)) {
      invalidRecords.push(lead);
      continue;
    }

    if (seenEmails.has(email)) {
      duplicateRecords.push(lead);
      continue;
    }

    const cleanLead = {
      name: lead.name,
      email,
      status: lead.status,
      source: lead.source
    };

    seenEmails.add(email);
    cleanRecords.push(cleanLead);
    incrementCounter(countsByStatus, cleanLead.status);
    incrementCounter(countsBySource, cleanLead.source);
  }

  return {
    cleanRecords,
    duplicateRecords,
    invalidRecords,
    countsByStatus,
    countsBySource
  };
}

function escapeCsvValue(value) {
  const text = String(value || "");

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function toCsv(records) {
  const headers = REQUIRED_COLUMNS;
  const rows = records.map((record) =>
    headers.map((header) => escapeCsvValue(record[header])).join(",")
  );

  return [headers.join(","), ...rows].join("\n") + "\n";
}

function renderCounterTable(counter) {
  const rows = Object.entries(counter)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([label, count]) => `| ${label} | ${count} |`);

  if (rows.length === 0) {
    return "| None | 0 |";
  }

  return rows.join("\n");
}

function renderReport(summary) {
  const generatedAt = new Date().toISOString();

  return `# Lead Cleanup Report

Generated at: ${generatedAt}

## Summary

| Metric | Count |
| --- | ---: |
| Input records | ${summary.totalRecords} |
| Clean leads | ${summary.cleanRecords.length} |
| Invalid email records | ${summary.invalidRecords.length} |
| Duplicate records | ${summary.duplicateRecords.length} |

## Leads by Status

| Status | Count |
| --- | ---: |
${renderCounterTable(summary.countsByStatus)}

## Leads by Source

| Source | Count |
| --- | ---: |
${renderCounterTable(summary.countsBySource)}

## Notes

- Only records with valid e-mail addresses are included in the clean CSV.
- Duplicate leads are identified by normalized e-mail address.
- This report uses fictitious sample data for portfolio demonstration purposes.
`;
}

function main() {
  const input = fs.readFileSync(inputPath, "utf8");
  const leads = parseCsv(input);
  const cleaned = cleanLeads(leads);
  const summary = {
    totalRecords: leads.length,
    ...cleaned
  };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(cleanCsvPath, toCsv(summary.cleanRecords));
  fs.writeFileSync(reportPath, renderReport(summary));

  console.log("Lead cleanup completed.");
  console.log(`Input records: ${summary.totalRecords}`);
  console.log(`Clean leads: ${summary.cleanRecords.length}`);
  console.log(`Invalid email records: ${summary.invalidRecords.length}`);
  console.log(`Duplicate records: ${summary.duplicateRecords.length}`);
  console.log(`Generated: ${path.relative(process.cwd(), cleanCsvPath)}`);
  console.log(`Generated: ${path.relative(process.cwd(), reportPath)}`);
}

main();
