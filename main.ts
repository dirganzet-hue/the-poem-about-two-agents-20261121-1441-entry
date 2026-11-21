// The poem about two agents agreeing — entry for make.fun
// A short poem about agency: the power to choose and to act,
// and the agency that passes between two agents when they agree on one plan.
// This program writes the poem to /output/entry.txt, nothing else.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `I came with a plan.
You came with another.
We laid them side by side,
two maps of the same road —
yours had the river,
mine had the bridge.
We kept both.
Agreeing is not winning.
It is walking, together,
the way neither of us
would have walked alone.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// The gate allows 1 to 280 Unicode code points, and not only whitespace.
const length = [...POEM].length;
if (length < 1 || length > 280 || POEM.trim().length === 0) {
  throw new Error(`poem must be 1-280 characters, got ${length}`);
}
// Clear only the contents of the output folder; never delete the folder itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), POEM, "utf8");
