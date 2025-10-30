const ALPH36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const VAL36 = Object.fromEntries(Array.from(ALPH36).map((ch, i) => [ch, i]));
export const checksumFns = {
    luhn,
    mod10: luhn,
    mod7: (digits) => modN(digits, 7),
    mod11: (digits) => mod11(digits),
    s10: s10CheckDigit,
    mod_37_36: mod3736,
    mod10_3_1: mod10_3_1,
};
export function luhn(digits) {
    let sum = 0, dbl = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = digits.charCodeAt(i) - 48;
        if (d < 0 || d > 9)
            return false;
        if (dbl) {
            d *= 2;
            if (d > 9)
                d -= 9;
        }
        sum += d;
        dbl = !dbl;
    }
    return sum % 10 === 0;
}
function modN(digits, n) {
    let acc = 0;
    for (let i = 0; i < digits.length; i++) {
        const c = digits.charCodeAt(i) - 48;
        if (c < 0 || c > 9)
            return false;
        acc = (acc * 10 + c) % n;
    }
    return acc === 0;
}
export function mod10_3_1(digits) {
    if (!/^\d+$/.test(digits) || digits.length < 2)
        return false;
    const check = digits.charCodeAt(digits.length - 1) - 48;
    let sum = 0;
    let posFromRight = 1;
    for (let i = digits.length - 2; i >= 0; i--, posFromRight++) {
        const d = digits.charCodeAt(i) - 48;
        if (d < 0 || d > 9)
            return false;
        const weight = posFromRight % 2 === 0 ? 3 : 1;
        sum += d * weight;
    }
    const cd = (10 - (sum % 10)) % 10;
    return cd === check;
}
function mod11(digits) {
    const weights = [2, 3, 4, 5, 6, 7];
    let sum = 0, wi = 0;
    for (let i = digits.length - 1; i >= 0; i--) {
        const d = digits.charCodeAt(i) - 48;
        if (d < 0 || d > 9)
            return false;
        sum += d * weights[wi];
        wi = (wi + 1) % weights.length;
    }
    return sum % 11 === 0;
}
export function mod3736(s) {
    let p = 36;
    const S = s.toUpperCase();
    for (let i = 0; i < S.length; i++) {
        const v = VAL36[S[i]];
        if (v === undefined)
            return false;
        p = ((p + v) * 2) % 37;
    }
    return p === 1;
}
export function s10CheckDigit(digits) {
    const w = [8, 6, 4, 2, 3, 5, 9, 7];
    if (digits.length !== 9)
        return false;
    const check = digits.charCodeAt(8) - 48;
    if (check < 0 || check > 9)
        return false;
    let sum = 0;
    for (let i = 0; i < 8; i++) {
        const d = digits.charCodeAt(i) - 48;
        if (d < 0 || d > 9)
            return false;
        sum += d * w[i];
    }
    const r = sum % 11;
    const cd = (11 - r) % 11;
    const final = cd === 10 ? 0 : cd;
    return final === check;
}
export function ontracCMod10(digits) {
    if (!/^\d{14}$/.test(digits))
        return false;
    const data = digits.slice(0, -1);
    const check = digits.charCodeAt(digits.length - 1) - 48;
    const withPrefix = data.startsWith("4") ? data : "4" + data;
    return luhnOnDigits(withPrefix, check);
}
export function ontracDMod10(digits) {
    if (!/^\d{14}$/.test(digits))
        return false;
    const data = digits.slice(0, -1);
    const check = digits.charCodeAt(digits.length - 1) - 48;
    const withPrefix = data.startsWith("5") ? data : "5" + data;
    return luhnOnDigits(withPrefix, check);
}
function luhnOnDigits(data, check) {
    let sum = 0, dbl = true;
    for (let i = data.length - 1; i >= 0; i--) {
        let d = data.charCodeAt(i) - 48;
        if (dbl) {
            d *= 2;
            if (d > 9)
                d -= 9;
        }
        sum += d;
        dbl = !dbl;
    }
    const cd = (10 - (sum % 10)) % 10;
    return cd === check;
}
