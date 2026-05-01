export function checkIfVariableMatched(template: string, allowed: string[]) {
    const matched = [...template.matchAll(/\{(\w+)\}/g)].map(m => m[1]);
    for (const m of matched) {
        if (!allowed.includes(m)) {
            throw new Error(`Variable ${m} tidak ditemukan`);
        }
    }
    return true;
} 