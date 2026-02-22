/**
 * Area calculation utilities for residential plot layout.
 * Scale: 1 meter = 5 SVG units
 */

/** Convert feet to SVG units */
export const feetToSvg = (feet) => Math.round(feet * 0.3048 * 5);

/** Convert meters to SVG units */
export const metersToSvg = (m) => Math.round(m * 5);

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
