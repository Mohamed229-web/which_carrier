#!/usr/bin/env node
import { detect, load } from "which_carrier";
import { seedRules } from "which_carrier-data";

function printHelp() {
  console.log(
    `which-carrier <TRACKING> [--json] [--origin=FR] [--dest=US] [--locale=FR,US,...]\n`
  );
}

const args: string[] = process.argv.slice(2);
if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
  printHelp();
  process.exit(0);
}

const tracking = args[0];
const jsonOut = args.includes("--json");
const origin = argVal("--origin");
const dest = argVal("--dest");
const locale = argVal("--locale")?.split(",").filter(Boolean);

function argVal(flag: string): string | undefined {
  const f = args.find((a: string) => a.startsWith(flag + "="));
  return f ? f.split("=")[1] : undefined;
}

load(seedRules);
const result = detect(tracking, {
  originCountry: origin,
  destinationCountry: dest,
  localeBoost: locale,
});

const p = result.primary;
if (!p) {
  console.log("Unrecognized");
  process.exit(2);
}

console.log(`${p.slug}\t(score:${p.score})\treasons:${p.reasons.join(",")}`);

if (result.candidates.length > 1) {
  console.log("Candidates:");
  for (const c of result.candidates.slice(1, 6)) {
    console.log(` - ${c.slug}\t${c.score}`);
  }
}
