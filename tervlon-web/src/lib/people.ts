export type PersonKey = "sarah" | "marcus" | "priya" | "james" | "you";

export interface Person {
  name: string;
  role: string;
  i: string;
  c: string;
}

/** Teammate identity — harmonised palette, all clear of teal. */
export const PEOPLE: Record<PersonKey, Person> = {
  sarah: { name: "Sarah Chen", role: "Engineering Lead", i: "SC", c: "#6a5fd6" },
  marcus: { name: "Marcus Rivera", role: "Senior Engineer", i: "MR", c: "#2f8568" },
  priya: { name: "Priya Sharma", role: "Engineer", i: "PS", c: "#bf6a4a" },
  james: { name: "James Okonkwo", role: "Reviewer", i: "JO", c: "#4b6691" },
  you: { name: "You", role: "", i: "JO", c: "#1a7ec2" },
};

export const TRACK_COLOR: Record<string, string> = {
  Backend: "#1a7ec2",
  Frontend: "#6a5fd6",
  "Full-stack": "#2f8568",
};
