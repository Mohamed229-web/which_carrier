export type IsoCountry = string;
export interface DetectHints {
    originCountry?: IsoCountry;
    destinationCountry?: IsoCountry;
    destinationPostalCode?: string;
    carrierWhitelist?: string[];
    localeBoost?: IsoCountry[];
}
export interface Candidate {
    slug: string;
    name?: string;
    score: number;
    reasons: string[];
    trackingUrl?: string;
}
export interface DetectionResult {
    primary: Candidate | null;
    candidates: Candidate[];
    warnings: string[];
}
export type ChecksumFn = (digits: string) => boolean;
export interface Pattern {
    note?: string;
    regex: RegExp;
    checksum?: {
        group?: number;
        fn: "luhn" | "mod7" | "mod11" | "s10" | "custom";
        customFnName?: string;
    };
    countries?: {
        kind: "origin" | "destination" | "either";
        codes: IsoCountry[];
        boost?: number;
    };
    baseScore?: number;
}
export interface CarrierRule {
    slug: string;
    name: string;
    group?: string;
    patterns: Pattern[];
    markets?: {
        primaryMarkets?: IsoCountry[];
        extraBoost?: number;
    };
    trackingUrlTemplate?: string;
}
export interface CarrierRuleJSON extends Omit<CarrierRule, "patterns"> {
    patterns: Array<{
        note?: string;
        regex: string;
        flags?: string;
        checksum?: {
            group?: number;
            fn: string;
            customFnName?: string;
        };
        countries?: {
            kind: "origin" | "destination" | "either";
            codes: IsoCountry[];
            boost?: number;
        };
        baseScore?: number;
    }>;
}
