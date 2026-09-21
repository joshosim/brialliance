import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

/**
 * Every source file under `app/`, so tests can assert on the code itself and
 * not just on rendered output.
 */
export function appSourceFiles(): string[] {
  return readdirSync(path.join(root, "app"), { recursive: true, encoding: "utf8" })
    .filter((entry) => /\.(tsx|ts|css)$/.test(entry))
    .map((entry) => path.join(root, "app", entry))
    .sort();
}

export function readApp(relativePath: string): string {
  return readFileSync(path.join(root, relativePath), "utf8");
}

export const globalsCss = readApp("app/globals.css");
