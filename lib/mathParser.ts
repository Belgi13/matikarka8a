/**
 * Math Parser Utility
 * Extracts parameters from problem text for visualizations.
 */

export interface EquationParams {
    leftA: number;
    leftB: number;
    rightA: number;
    rightB: number;
    variable: string;
    isFractional?: boolean;
}

export interface GeometryParams {
    a?: number;
    b?: number;
    c?: number;
    r?: number;
    d?: number;
    h?: number;
    v?: number;
    S?: number;
}

export function parseEquation(text: string): EquationParams | null {
    const clean = text.replace(/\s+/g, '').replace(/,/g, '.');
    const parts = clean.split('=');
    if (parts.length !== 2) return null;

    const left = parseSide(parts[0]);
    const right = parseSide(parts[1]);

    if (!left || !right) return null;

    return {
        leftA: left.a,
        leftB: left.b,
        rightA: right.a,
        rightB: right.b,
        variable: left.variable || right.variable || 'x',
        isFractional: left.isFractional || right.isFractional
    };
}

function parseSide(side: string) {
    // Simple linear side parser: handles ax + b and x/a + b
    // This is a basic version, can be expanded
    let a = 0;
    let b = 0;
    let variable = '';
    let isFractional = false;

    const terms = side.replace(/-/g, '+-').split('+').filter(Boolean);

    for (const term of terms) {
        if (/[x-z]/i.test(term)) {
            const match = term.match(/(-?\d*\.?\d*)\/?(\d*\.?\d*)([x-z])/i);
            if (match) {
                variable = match[3];
                const coef = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1]);
                const denom = parseFloat(match[2]);

                if (!isNaN(denom) && denom !== 0) {
                    a += coef / denom;
                    isFractional = true;
                } else {
                    a += coef;
                }
            }
        } else {
            b += parseFloat(term) || 0;
        }
    }

    return { a, b, variable, isFractional };
}

export function extractGeometry(text: string): GeometryParams {
    const params: GeometryParams = {};

    // Look for patterns like "a = 5", "r=10", etc.
    const regexes = [
        { key: 'a', re: /a\s*=\s*(\d*\.?\d+)/i },
        { key: 'b', re: /b\s*=\s*(\d*\.?\d+)/i },
        { key: 'c', re: /c\s*=\s*(\d*\.?\d+)/i },
        { key: 'r', re: /r\s*=\s*(\d*\.?\d+)/i },
        { key: 'd', re: /d\s*=\s*(\d*\.?\d+)/i },
        { key: 'h', re: /(h|v)\s*=\s*(\d*\.?\d+)/i },
        { key: 'v', re: /V\s*=\s*(\d*\.?\d+)/i },
        { key: 'S', re: /S\s*=\s*(\d*\.?\d+)/i },
    ];

    regexes.forEach(({ key, re }) => {
        const match = text.match(re);
        if (match) {
            // @ts-expect-error params indexing
            params[key] = parseFloat(match[match.length - 1]);
        }
    });

    return params;
}
