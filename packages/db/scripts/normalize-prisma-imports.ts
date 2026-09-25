import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const generatedDirectory = path.resolve("generated/prisma");

async function normalizeFile(filePath: string) {
  const source = await readFile(filePath, "utf8");
  const normalized = source.replace(
    /((?:from|export type \* from|export \* from)\s*["'])(\.\.?\/[^"']+)\.js(["'])/g,
    "$1$2$3",
  );

  if (normalized !== source) {
    await writeFile(filePath, normalized);
  }
}

async function visit(directory: string) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await visit(entryPath);
    } else if (entry.name.endsWith(".ts")) {
      await normalizeFile(entryPath);
    }
  }
}

await visit(generatedDirectory);
