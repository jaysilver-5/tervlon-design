import type { icon as Icons } from "@/components/icons";

export type Persona = "developer" | "company" | "institution";
type IconKey = keyof typeof Icons;

export interface NavItem {
  href: string;
  label: string;
  icon: IconKey;
  badge?: string;
  live?: boolean;
}

export interface PersonaConfig {
  label: string;
  sec: string;
  home: string;
  who: string;
  role: string;
  avInit: string;
  avColor: string;
  icon: IconKey;
  desc: string;
  nav: NavItem[];
}

/**
 * Role is account-level — set at sign-up, switched from the account menu, NEVER a
 * nav tab. The rail shows exactly one persona's nav. (Mirrors index.html PERSONAS.)
 */
export const PERSONAS: Record<Persona, PersonaConfig> = {
  developer: {
    label: "Developer", sec: "Develop", home: "/app",
    who: "Joshua O.", role: "Developer", avInit: "JO", avColor: "var(--blue)",
    icon: "dev", desc: "Your sprints & credential",
    nav: [
      { href: "/app", label: "Home", icon: "home" },
      { href: "/app/catalog", label: "Sprint catalog", icon: "grid" },
      { href: "/sprint/ecommerce-api-sprint", label: "Active sprint", icon: "shield", live: true },
      { href: "/app/scorecard", label: "Scorecards", icon: "file" },
      { href: "/app/billing", label: "Plans & credits", icon: "wallet" },
    ],
  },
  company: {
    label: "Company", sec: "Hiring", home: "/app/company",
    who: "Northwind", role: "Company · admin", avInit: "NW", avColor: "var(--marcus)",
    icon: "bldg", desc: "Assess & hire candidates",
    nav: [
      { href: "/app/company", label: "Dashboard", icon: "home" },
      { href: "/app/company/review-board", label: "Review board", icon: "users", badge: "3" },
      { href: "/app/company/assessments", label: "Assessments", icon: "grid" },
      { href: "/app/catalog", label: "Scenario catalog", icon: "book" },
    ],
  },
  institution: {
    label: "Institution", sec: "Academy", home: "/app/institution",
    who: "Lagos Tech Academy", role: "Institution · admin", avInit: "LA", avColor: "var(--sarah)",
    icon: "cap", desc: "Verify cohort skills",
    nav: [
      { href: "/app/institution", label: "Dashboard", icon: "home" },
      { href: "/app/institution/cohort", label: "Cohorts", icon: "users" },
      { href: "/app/catalog", label: "Scenario catalog", icon: "book" },
    ],
  },
};

export const PERSONA_ORDER: Persona[] = ["developer", "company", "institution"];

/** Which persona owns the current route (role is account-level; this keeps the
 *  visible nav consistent with where you are). */
export function personaFromPath(path: string): Persona {
  if (path.startsWith("/app/company")) return "company";
  if (path.startsWith("/app/institution")) return "institution";
  return "developer";
}
