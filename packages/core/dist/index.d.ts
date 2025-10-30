import type { DetectHints, DetectionResult, CarrierRule, CarrierRuleJSON } from "./types";
export * from "./types";
export declare const version = "0.1.3";
export declare function register(rule: CarrierRule): void;
export declare function load(json: CarrierRuleJSON[]): void;
export declare function detect(trackingRaw: string, hints?: DetectHints): DetectionResult;
