const fs = require("fs");
const path = require("path");
const { cleanLeads, parseCsv, renderReport, toCsv } = require("./leadCleanup");

const inputPath = path.join(__dirname, "..", "examples", "input", "leads.csv");
const outputDir = path.join(__dirname, "..", "examples", "output");
const cleanCsvPath = path.join(outputDir, "clean-leads.csv");
const reportPath = path.join(outputDir, "report.md");

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
