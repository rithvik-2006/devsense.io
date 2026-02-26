import path from "path";
import fs from "fs";

const FRAMEWORK_RULES: Record<string, string> = {
  next: "Next.js",
  react: "React",
  vue: "Vue",
  angular: "Angular",
  express: "Express",
  fastify: "Fastify",
  "@nestjs/core": "NestJS",
  svelte: "Svelte",
  nuxt: "Nuxt",
  remix: "Remix",
  vite: "Vite"
};

const DATABASE_RULES: Record<string, string> = {
  mongoose: "MongoDB",
  prisma: "Prisma ORM",
  pg: "PostgreSQL",
  mysql: "MySQL",
  mysql2: "MySQL",
  "@supabase/supabase-js": "Supabase",
  firebase: "Firebase",
  "firebase-admin": "Firebase",
  redis: "Redis",
  "@planetscale/database": "PlanetScale",
  drizzle: "Drizzle ORM"
};

const SERVICE_RULES: Record<string, string> = {
  "@supabase/supabase-js": "Supabase",
  firebase: "Firebase",
  "firebase-admin": "Firebase Admin",
  stripe: "Stripe",
  openai: "OpenAI",
  axios: "REST API Client",
  tailwindcss: "TailwindCSS",
  "@clerk/nextjs": "Clerk Auth",
  nextauth: "NextAuth",
  supabase: "Supabase",
  vercel: "Vercel"
};

export interface NodeAnalysisResult {
  frameworks: string[];
  databases: string[];
  services: string[];
}

function getDependencies(): Record<string, any> {
  const pkgPath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(pkgPath)) return {};

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  return {
    ...pkg.dependencies,
    ...pkg.devDependencies
  };
}

function detectNodeFrameworks(deps: Record<string, any>): string[] {
  const frameworks: string[] = [];

  for (const [pkg, label] of Object.entries(FRAMEWORK_RULES)) {
    if (deps[pkg]) frameworks.push(label);
  }

  return [...new Set(frameworks)];
}

function detectNodeDatabases(deps: Record<string, any>): string[] {
  const db: string[] = [];

  for (const [pkg, label] of Object.entries(DATABASE_RULES)) {
    if (deps[pkg]) db.push(label);
  }

  return [...new Set(db)];
}

function detectNodeServices(deps: Record<string, any>): string[] {
  const services: string[] = [];

  for (const [pkg, label] of Object.entries(SERVICE_RULES)) {
    if (deps[pkg]) services.push(label);
  }

  return [...new Set(services)];
}

export function analyzeNodeProject(): NodeAnalysisResult {
  const deps = getDependencies();

  return {
    frameworks: detectNodeFrameworks(deps),
    databases: detectNodeDatabases(deps),
    services: detectNodeServices(deps)
  };
}
