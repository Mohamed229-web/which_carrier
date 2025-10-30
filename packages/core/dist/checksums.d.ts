import type { ChecksumFn } from "./types";
export declare const checksumFns: Record<string, ChecksumFn>;
export declare function luhn(digits: string): boolean;
export declare function mod10_3_1(digits: string): boolean;
export declare function mod3736(s: string): boolean;
export declare function s10CheckDigit(digits: string): boolean;
export declare function ontracCMod10(digits: string): boolean;
export declare function ontracDMod10(digits: string): boolean;
