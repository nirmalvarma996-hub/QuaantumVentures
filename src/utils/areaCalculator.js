/**
 * Area calculation utilities for residential plot layout.
 * Scale: 1 meter = 5 SVG units
 */

/** Convert feet to SVG units */
export const feetToSvg = (feet) => Math.round(feet * 0.3048 * 5);

/** Convert meters to SVG units */
export const metersToSvg = (m) => Math.round(m * 5);

/** Parse dimension string into { feet, inches } components */
export const parseToComponents = (str) => {
    if (!str) return { feet: 0, inches: 0 };
    const feetMatch = str.match(/(\d+)(?:′|')/);
    const inchesMatch = str.match(/(\d+)(?:″|")/);
    return {
        feet: feetMatch ? parseInt(feetMatch[1], 10) : 0,
        inches: inchesMatch ? parseInt(inchesMatch[1], 10) : 0
    };
};

/** Average two dimensions using the "decimal = inches" rule */
const averageWithInchesRule = (s1, s2) => {
    const d1 = parseToComponents(s1);
    const d2 = parseToComponents(s2);

    let avgFt = (d1.feet + d2.feet) / 2;
    let avgIn = (d1.inches + d2.inches) / 2;

    // User Rule: result decimals (like .5) are considered as inches
    if (avgFt % 1 !== 0) {
        avgFt = Math.floor(avgFt);
        avgIn += 5; // .5 foot average becomes 5 inches
    }

    return avgFt + (avgIn / 12);
};

/** Calculate area for irregular plots using average of opposite sides */
export const calculateIrregularArea = (westStr, eastStr, northStr, southStr) => {
    const avgWidth = averageWithInchesRule(westStr, eastStr);
    const avgHeight = averageWithInchesRule(northStr, southStr);

    const sqft = avgWidth * avgHeight;

    return {
        sqft: Math.round(sqft),
        ankanams: +(sqft / 36).toFixed(2),
        cents: +(sqft / 435.6).toFixed(2),
    };
};

/** Calculate area from length × width (in feet) */
export const calculateArea = (lengthFt, widthFt) => {
    const sqft = lengthFt * widthFt;
    return {
        sqft,
        ankanams: +(sqft / 36).toFixed(2),
        cents: +(sqft / 435.6).toFixed(2),
    };
};

/** Road width constants (SVG units) */
export const ROAD_WIDTHS = {
    '9M': metersToSvg(9),    // 45
    '12M': metersToSvg(12),  // 60
    '60ft': feetToSvg(60),   // 91
    '80ft': feetToSvg(80),   // 122
};
