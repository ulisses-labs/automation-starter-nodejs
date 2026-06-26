const assert = require("node:assert/strict");
const test = require("node:test");
const { cleanLeads } = require("../src/leadCleanup");

test("removes leads with invalid e-mail addresses", () => {
  const result = cleanLeads([
    {
      name: "Ana Silva",
      email: "ana.example.com",
      status: "new",
      source: "website"
    },
    {
      name: "Bruno Costa",
      email: "bruno@example.com",
      status: "qualified",
      source: "linkedin"
    }
  ]);

  assert.equal(result.cleanRecords.length, 1);
  assert.equal(result.invalidRecords.length, 1);
  assert.equal(result.invalidRecords[0].email, "ana.example.com");
});

test("removes duplicate e-mail addresses after normalization", () => {
  const result = cleanLeads([
    {
      name: "Ana Silva",
      email: "ANA@example.com",
      status: "new",
      source: "website"
    },
    {
      name: "Ana Silva Duplicate",
      email: "ana@example.com",
      status: "new",
      source: "manual"
    }
  ]);

  assert.deepEqual(result.cleanRecords.map((lead) => lead.email), ["ana@example.com"]);
  assert.equal(result.duplicateRecords.length, 1);
  assert.equal(result.duplicateRecords[0].email, "ana@example.com");
});

test("preserves valid unique leads", () => {
  const result = cleanLeads([
    {
      name: "Carla Mendes",
      email: "carla@example.com",
      status: "qualified",
      source: "website"
    }
  ]);

  assert.deepEqual(result.cleanRecords, [
    {
      name: "Carla Mendes",
      email: "carla@example.com",
      status: "qualified",
      source: "website"
    }
  ]);
  assert.deepEqual(result.invalidRecords, []);
  assert.deepEqual(result.duplicateRecords, []);
});

test("counts clean leads by status and source", () => {
  const result = cleanLeads([
    {
      name: "Ana Silva",
      email: "ana@example.com",
      status: "new",
      source: "website"
    },
    {
      name: "Bruno Costa",
      email: "bruno@example.com",
      status: "qualified",
      source: "linkedin"
    },
    {
      name: "Carla Mendes",
      email: "carla@example.com",
      status: "new",
      source: "website"
    },
    {
      name: "Invalid Lead",
      email: "invalid",
      status: "new",
      source: "website"
    },
    {
      name: "Duplicate Lead",
      email: "ana@example.com",
      status: "new",
      source: "manual"
    }
  ]);

  assert.deepEqual(result.countsByStatus, {
    new: 2,
    qualified: 1
  });
  assert.deepEqual(result.countsBySource, {
    linkedin: 1,
    website: 2
  });
});
