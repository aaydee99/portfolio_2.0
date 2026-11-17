// All personal content lives here. Edit this file to update the site.

export type IconKind = "tsx" | "md" | "json" | "log" | "sh";

export const FILES: { f: string; id: string; ic: IconKind; lang: string; label: string; tab: boolean }[] = [
  { f: "index.tsx", id: "home", ic: "tsx", lang: "TypeScript React", label: "Home", tab: true },
  { f: "about.md", id: "about", ic: "md", lang: "Markdown", label: "About", tab: true },
  { f: "package.json", id: "stack", ic: "json", lang: "JSON", label: "Stack", tab: false },
  { f: "showcase.log", id: "work", ic: "log", lang: "Log", label: "Work", tab: true },
  { f: "CHANGELOG.md", id: "experience", ic: "md", lang: "Markdown", label: "Experience", tab: true },
  { f: "run.sh", id: "terminal", ic: "sh", lang: "Shell Script", label: "Shell", tab: false },
  { f: "contact.ts", id: "contact", ic: "tsx", lang: "TypeScript", label: "Contact", tab: true },
];

export const PROFILE = {
  first: "Abdullah",
  last: "Akhtar",
  domain: "abdullahakhtar",
  slug: "abdullah-akhtar",
  role: "Solutions Architect",
  company: "Adapture",
  location: "Islamabad, Pakistan",
  email: "aaydee99@gmail.com",
  phone: "+92 332 826 1692",
  phoneHref: "tel:+923328261692",
  github: "aaydee99",
  linkedin: "abdullahakhtar1999",
  availability: "Open to full-time & contract roles",
  tagline:
    "I write Cloudflare Workers, Terraform and WAF rules for 45+ enterprise clients, and I've been shipping React and React Native apps since 2018.",
};

export const ROLES = ["Solutions Architect", "Frontend Engineer", "React Developer", "Cloud Security Engineer", "DevOps Engineer"];

export const TECH = ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Cloudflare Workers", "WAF", "Bot Management", "API Shield", "Rate Limiting", "Terraform", "GitHub Actions", "Docker", "Node.js", "Firebase", "Supabase", "GSAP", "Framer Motion", "OpenTelemetry", "Go", "Vercel", "DNS · SSL/TLS"];

export const SKILL_GROUPS: Record<"fe" | "edge" | "ops", { label: string; items: string[] }> = {
  fe: { label: "frontend", items: ["React", "Next.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "React Native", "Redux", "Zustand", "Context API", "Framer Motion", "GSAP", "Radix UI", "Jest & Detox"] },
  edge: { label: "edge", items: ["Cloudflare Workers", "Snippets", "WAF", "Bot Management", "Rate Limiting", "API Shield", "Turnstile", "DDoS", "CDN · Cache Rules", "DNS", "SSL/TLS", "OWASP Top 10", "SOC Reporting"] },
  ops: { label: "devops", items: ["Terraform", "GitHub Actions", "Git / GitOps", "Docker", "Kubernetes (basics)", "AWS Lambda", "Vercel", "OpenTelemetry", "Jaeger", "Go", "Node.js", "Supabase", "Firebase"] },
};

export const STATS = [
  { k: "years.shipping", to: 8, suffix: "+" },
  { k: "clients.enterprise", to: 45, suffix: "+" },
  { k: "zones.as_code", to: 4000, suffix: "+" },
  { k: "fp.reduction", to: 50, suffix: "%" },
];

export const DEPS: [string, [string, string][]][] = [
  ["frontend.json", [["react", "React JS"], ["next", "Next JS"], ["typescript", "TS"], ["tailwindcss", "Tailwind"], ["framer / gsap", "Motion"], ["react-native", "Expo"]]],
  ["edge.json", [["workers / snippets", "JS · TS"], ["waf", "managed + custom"], ["bot-management", "phased"], ["rate-limiting", "log→block"], ["api-shield", "25 zones"], ["turnstile", "*"]]],
  ["infra.json", [["terraform", "4,000+ zones"], ["github-actions", "CI/CD"], ["docker", "*"], ["opentelemetry", "Jaeger"], ["aws-lambda", "*"], ["vercel", "*"]]],
];

// Relative focus, not self-scores.
export const BARS: [string, string, number][] = [
  ["Frontend", "React · Next.js · Tailwind · Motion", 90],
  ["Edge security", "WAF · Bots · Rate limits · API Shield", 90],
  ["DevOps / IaC", "Terraform · GitHub Actions · Docker", 92],
  ["Mobile", "React Native · Expo · Firebase", 65],
  ["Backend", "Node · Express · Go microservices", 60],
];

// Add repo names here to make them clickable links to GitHub.
export const PUBLIC_REPOS = new Set<string>([]);

export const REPOS: { repo: string; type: string; msg: string; tech: string; badge: string }[] = [
  { repo: "zone-analyser", type: "feat", msg: "Cloudflare Audit Console: Next.js 16 / React 19 app with role-based dashboards, live job progress, encrypted vault, Turnstile, strict CSP and 240+ tests", tech: "Next.js · React 19 · Zustand", badge: "latest" },
  { repo: "tf-hcp", type: "feat", msg: "Hardened zone as code: modular Terraform for Full Strict TLS, HSTS, DNSSEC, CAA, DMARC, OWASP rules and a scoped token", tech: "Terraform · Cloudflare", badge: "iac" },
  { repo: "ci-cd-snippets", type: "ci", msg: "GitHub Actions pipeline that checks secrets and deploys edge Snippets and rules", tech: "GitHub Actions · Snippets", badge: "ci/cd" },
  { repo: "oms-go", type: "feat", msg: "Order Management System: five Go microservices on gRPC and RabbitMQ in Docker, traced with OpenTelemetry and Jaeger", tech: "Go · gRPC · RabbitMQ · Docker", badge: "backend" },
  { repo: "AwwardsFrontendSite", type: "ui", msg: "Animated landing page: award-style site with scroll-triggered GSAP animation and 3D tilt cards", tech: "GSAP · React", badge: "frontend" },
  { repo: "burger-shop-frontend", type: "feat", msg: "Burger Shop: React + TypeScript ordering flow from menu to checkout and order tracking, on a typed, Zod-validated Express API", tech: "React Router · Context · Zod", badge: "frontend" },
  { repo: "FoodBridge", type: "feat", msg: "React Native + Expo app with Firebase auth, maps, QR scanning and offline storage", tech: "React Native · Expo · Firebase", badge: "mobile" },
];

export type Release = { date: string; ver: string; kind: "major" | "minor" | "patch"; title: string; org: string; bullets: string[]; tags: string[]; edu?: boolean };

export const RELEASES: Release[] = [
  { date: "Mar 2025 – Present", ver: "v6.0.0", kind: "major", title: "Solutions Architect", org: "Adapture · Remote", bullets: ["Tune WAF managed and custom rules across 23 enterprise zones, cutting false positives by 50%", "Roll out bot management and rate limiting in phased log, challenge and block stages; onboard APIs to API Shield across 25 zones for 23 clients", "Manage Cloudflare config as code with Terraform across 4,000+ zones, reconciling drift through Git review and CI/CD", "Write JavaScript and TypeScript Cloudflare Workers for 45+ enterprise clients, and produce weekly SOC reports"], tags: ["cloudflare", "terraform", "workers", "waf", "soc"] },
  { date: "Feb 2025 – Mar 2025", ver: "v5.1.0", kind: "minor", title: "Web Developer", org: "Talha Tech Solutions · Contract", bullets: ["Built responsive interfaces and connected third-party REST APIs", "Removed front-end performance bottlenecks; hardened apps with security headers and input validation"], tags: ["react", "rest-api", "security-headers"] },
  { date: "Jan 2025 – Feb 2025", ver: "v5.0.0", kind: "minor", title: "Frontend Developer", org: "Greeka · Contract", bullets: ["Delivered SEO-friendly, server-rendered Next.js and TypeScript pages", "Built a reusable Tailwind component library with the design team"], tags: ["nextjs", "typescript", "tailwind"] },
  { date: "Mar 2024 – Jan 2025", ver: "v4.0.0", kind: "major", title: "MERN Developer", org: "Savelife.ai · Islamabad", bullets: ["Built the React front end of an AI tool that turns doctors' recordings into structured medical documents, used by 35+ clinical clients", "Built Node/Express services connecting speech-to-text models, with encrypted storage and access controls in line with HIPAA"], tags: ["react", "node", "express", "hipaa"] },
  { date: "2024", ver: "v3.1.0", kind: "patch", title: "BS Computer Science", org: "FAST-NUCES, Islamabad", bullets: [], tags: ["education"], edu: true },
  { date: "Jul 2022 – Mar 2024", ver: "v3.0.0", kind: "major", title: "Associate Software Engineer", org: "CareerNetwork.co · Islamabad", bullets: ["Built React and Tailwind interfaces in a shared codebase for a careers platform with 1,000+ users", "Integrated Firebase Auth, Firestore and security rules"], tags: ["react", "tailwind", "firebase"] },
  { date: "Aug 2018 – Feb 2022", ver: "v2.0.0", kind: "major", title: "Freelance Web Developer", org: "Self-employed · Remote", bullets: ["Shipped React web apps and React Native (Expo) mobile apps for 15–20 clients", "Added JWT authentication, push notifications and offline storage"], tags: ["mern", "react-native", "expo"] },
  { date: "2018", ver: "v1.0.0", kind: "patch", title: "A Levels", org: "Beaconhouse, Islamabad", bullets: [], tags: ["education"], edu: true },
];

export const MUSIC = {
  title: "AFTER HOURS",
  subtitle: "lo-fi · generated live",
  // Put an mp3 in /public and set its path here (e.g. "/music.mp3") to play a real track.
  src: null as string | null,
  loopSeconds: 120,
};
