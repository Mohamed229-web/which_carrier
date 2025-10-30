import { checksumFns } from "./checksums";
import type {
  DetectHints,
  DetectionResult,
  CarrierRule,
  CarrierRuleJSON,
  Candidate,
  Pattern,
} from "./types";
export * from "./types";

const RULES: CarrierRule[] = [];
export const version = "0.1.3";

function re(s: string, flags = ""): RegExp {
  return new RegExp(s, flags);
}

export function register(rule: CarrierRule) {
  RULES.push(rule);
}

export function load(json: CarrierRuleJSON[]) {
  for (const r of json) {
    const patterns: Pattern[] = r.patterns.map((p) => ({
      note: p.note,
      regex: re(p.regex, p.flags ?? ""),
      checksum: p.checksum as any,
      countries: p.countries,
      baseScore: p.baseScore,
    }));
    register({
      slug: r.slug,
      name: r.name,
      group: r.group,
      patterns,
      markets: r.markets,
      trackingUrlTemplate: (r as any).trackingUrlTemplate,
    });
  }
}

export function detect(
  trackingRaw: string,
  hints: DetectHints = {}
): DetectionResult {
  const warnings: string[] = [];
  const tracking = trackingRaw.trim();
  const normalized = tracking.replace(/\s+/g, "");
  if (!tracking)
    return {
      primary: null,
      candidates: [],
      warnings: ["Empty tracking number"],
    };

  const candidates: Candidate[] = [];

  outer: for (const rule of RULES) {
    if (hints.carrierWhitelist && !hints.carrierWhitelist.includes(rule.slug))
      continue;

    for (const p of rule.patterns) {
      const m = tracking.match(p.regex);
      if (!m) continue;

      let score = p.baseScore ?? 2;
      const reasons: string[] = ["regex"];

      if (p.checksum) {
        const group = p.checksum.group ?? 0;
        const raw = group === 0 ? tracking : m[group] ?? "";
        const fnName = p.checksum.fn as string;
        const customName = p.checksum.customFnName as string | undefined;

        let segment = "";
        if (fnName === "mod_37_36") {
          // keep letters + digits, strip spaces
          segment = raw.replace(/\s+/g, "").toUpperCase();
        } else {
          // default: digits only
          segment = raw.replace(/\D/g, "");
        }

        const fn =
          fnName === "custom" && customName
            ? (checksumFns as any)[customName] ?? null
            : (checksumFns as any)[fnName];

        if (fn && segment && fn(segment)) {
          score += 3;
          reasons.push("checksum");
        } else {
          reasons.push("checksum-failed");
        }
      }

      if (p.countries && hints) {
        const boost = p.countries.boost ?? 1;
        const { originCountry, destinationCountry } = hints;
        if (
          p.countries.kind === "origin" &&
          originCountry &&
          p.countries.codes.includes(originCountry)
        ) {
          score += boost;
          reasons.push("origin-match");
        }
        if (
          p.countries.kind === "destination" &&
          destinationCountry &&
          p.countries.codes.includes(destinationCountry)
        ) {
          score += boost;
          reasons.push("dest-match");
        }
        if (
          p.countries.kind === "either" &&
          ((originCountry && p.countries.codes.includes(originCountry)) ||
            (destinationCountry &&
              p.countries.codes.includes(destinationCountry)))
        ) {
          score += boost;
          reasons.push("country-match");
        }
      }

      if (rule.markets?.primaryMarkets && hints.localeBoost) {
        const intersects = rule.markets.primaryMarkets.some((c) =>
          hints.localeBoost!.includes(c)
        );
        if (intersects) {
          score += rule.markets.extraBoost ?? 1;
          reasons.push("market-boost");
        }
      }

      const trackingUrl = rule.trackingUrlTemplate
        ? rule.trackingUrlTemplate.replace("%s", normalized)
        : undefined;
      candidates.push({
        slug: rule.slug,
        name: rule.name,
        score,
        reasons,
        trackingUrl,
      });
      continue outer;
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return { primary: candidates[0] ?? null, candidates, warnings };
}
