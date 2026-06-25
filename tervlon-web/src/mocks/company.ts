import type { Band } from "./dev";

export const COMPANY = {
  name: "Northwind",
  stats: { openAssessments: 2, candidates: 7, needsReview: 3, hired: 1 },
  assessments: [
    { id: "as_1", title: "Backend Engineer — API", scenario: "E-Commerce API Sprint", track: "Backend", status: "Active", invited: 5, completed: 3 },
    { id: "as_2", title: "Frontend Engineer", scenario: "Analytics Dashboard Sprint", track: "Frontend", status: "Active", invited: 4, completed: 1 },
    { id: "as_3", title: "Full-stack (draft)", scenario: "Feature Flags Sprint", track: "Full-stack", status: "Draft", invited: 0, completed: 0 },
  ],
  pipeline: [
    { name: "Joshua Okonkwo", assessment: "Backend Engineer — API", track: "Backend", status: "Completed", score: 88, band: "clear" as Band },
    { name: "Amara Eze", assessment: "Backend Engineer — API", track: "Backend", status: "Completed", score: 81, band: "review_suggested" as Band },
    { name: "Sofia Rossi", assessment: "Backend Engineer — API", track: "Backend", status: "Completed", score: 76, band: "review_recommended" as Band },
    { name: "Daniel Kim", assessment: "Frontend Engineer", track: "Frontend", status: "In sprint", score: null, band: null },
    { name: "Liam Walsh", assessment: "Frontend Engineer", track: "Frontend", status: "Invited", score: null, band: null },
    { name: "Mei Tan", assessment: "Backend Engineer — API", track: "Backend", status: "Completed", score: 84, band: "clear" as Band },
    { name: "Omar Farah", assessment: "Frontend Engineer", track: "Frontend", status: "Invited", score: null, band: null },
  ],
};

export const INSTITUTION = {
  name: "Lagos Tech Academy",
  stats: { cohorts: 3, learners: 64, verified: 41, completion: 78 },
  cohorts: [
    { id: "c1", name: "Backend Bootcamp · Fall", track: "Backend", status: "Active", learners: 24, completion: 82, avg: 79 },
    { id: "c2", name: "Frontend Track · Fall", track: "Frontend", status: "Active", learners: 22, completion: 74, avg: 81 },
    { id: "c3", name: "Full-stack · Spring", track: "Full-stack", status: "Completed", learners: 18, completion: 100, avg: 77 },
  ],
  coverage: [
    { k: "Auth & security", v: 84 }, { k: "Data modelling", v: 72 }, { k: "API design", v: 80 }, { k: "Testing discipline", v: 65 }, { k: "Communication", v: 76 },
  ],
  learners: [
    { name: "Joshua Okonkwo", track: "Backend", status: "Completed", score: 88, band: "clear" as Band },
    { name: "Amara Eze", track: "Backend", status: "Completed", score: 81, band: "review_suggested" as Band },
    { name: "Chioma Okafor", track: "Backend", status: "Completed", score: 85, band: "clear" as Band },
    { name: "Tunde Bello", track: "Backend", status: "In sprint", score: null, band: null },
    { name: "Sofia Rossi", track: "Backend", status: "Completed", score: 76, band: "review_recommended" as Band },
    { name: "David Mensah", track: "Backend", status: "Not started", score: null, band: null },
  ],
};
