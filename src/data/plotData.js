/**
 * Plot data for the quaantumm Ventures residential layout.
 * Based on actual TUDA-approved layout diagram.
 * S.Nos: 59-5B & 75-4A, 4B of Mangalam (V), Tirupati (U) Mandal.
 *
 * Conversion Logic:
 *   1 Ankanam = 36 sq ft
 *   1 Sq Yard = 9 sq ft
 *
 * Status: "available" | "sold" | "reserved"
 */

const rawPlots = [
    // ── RIGHT COLUMN (East facing, along existing 80' road) ──────────
    // Upper right (above 12M road)
    { plotNumber: 1, length: 48, width: 30, status: "sold", facing: "West" },
    { plotNumber: 2, length: 43, width: 30, status: "sold", facing: "West" },
    { plotNumber: 3, length: 43.5, width: 30, status: "sold", facing: "West" },
    { plotNumber: 4, length: 43, width: 30, status: "sold", facing: "West" },
    // Lower right (below 12M road)
    { plotNumber: 5, length: 42, width: 30, status: "sold", facing: "West" },
    { plotNumber: 6, length: 42, width: 30, status: "sold", facing: "West" },
    { plotNumber: 7, length: 41, width: 30, status: "sold", facing: "West" },
    { plotNumber: 8, length: 41, width: 30, status: "available", facing: "West" },
    { plotNumber: 9, length: 41, width: 30, status: "available", facing: "West" },
    { plotNumber: 10, length: 41, width: 30, status: "available", facing: "West" },
    { plotNumber: 11, length: 40, width: 30, status: "available", facing: "West" },
    { plotNumber: 12, length: 40, width: 30, status: "available", facing: "West" },
    { plotNumber: 13, length: 40, width: 30, status: "available", facing: "West" },
    { plotNumber: 14, length: 40, width: 30, status: "sold", facing: "West" },
    { plotNumber: 15, length: 71.6, width: 40.3, status: "sold", facing: "West" },

    // ── UPPER SECTION (above 12M road) ──────────────────────────────
    // Zone E — between 9M Layout Road and right column
    { plotNumber: 23, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 24, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 25, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 26, length: 60, width: 60, status: "sold", facing: "East" },
    { plotNumber: 27, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 28, length: 60, width: 30, status: "sold", facing: "East" },
    { plotNumber: 29, length: 60, width: 30, status: "sold", facing: "East" },
    { plotNumber: 30, length: 60, width: 31.75, status: "sold", facing: "East" },
    { plotNumber: 31, length: 60, width: 48.6, status: "available", facing: "East" },

    // Zone D — between 12M road and 9M Layout Road
    { plotNumber: 32, length: 50, width: 31.75, status: "sold", facing: "West" },
    { plotNumber: 33, length: 50, width: 30, status: "sold", facing: "West" },
    { plotNumber: 34, length: 50, width: 30, status: "sold", facing: "West" },
    { plotNumber: 35, length: 50, width: 36, status: "sold", facing: "West" },
    { plotNumber: 36, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 37, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 38, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 39, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 40, length: 50, width: 60, status: "sold", facing: "West" },

    // Zone C — between 9M road and 12M road (upper left area)
    { plotNumber: 52, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 53, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 54, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 55, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 56, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 57, length: 60, width: 60, status: "sold", facing: "East" },
    { plotNumber: 58, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 59, length: 60, width: 30, status: "sold", facing: "East" },

    // Zone B — far upper-left (near open space)
    { plotNumber: 60, length: 60, width: 30, status: "sold", facing: "East" },
    { plotNumber: 61, length: 60, width: 31.75, status: "sold", facing: "East" },
    { plotNumber: 62, length: 42, width: 28.875, status: "sold", facing: "West" },

    // ── LOWER SECTION (below 12M road) ─────────────────────────────
    // Zone I — between 9M Layout Road and right column
    { plotNumber: 41, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 42, length: 50, width: 60, status: "available", facing: "West" },
    { plotNumber: 43, length: 50, width: 60, status: "available", facing: "West" },
    { plotNumber: 44, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 45, length: 50, width: 60, status: "sold", facing: "West" },
    { plotNumber: 46, length: 50, width: 82.6, status: "sold", facing: "West" },
    { plotNumber: 47, length: 60.08, width: 88.08, status: "sold", facing: "East" },
    { plotNumber: 48, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 49, length: 60, width: 36, status: "sold", facing: "East" },

    // Zone H — between 12M road and 9M Layout Road
    { plotNumber: 50, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 51, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 63, length: 42, width: 30, status: "sold", facing: "West" },
    { plotNumber: 64, length: 42, width: 36, status: "sold", facing: "West" },
    { plotNumber: 65, length: 60, width: 42, status: "sold", facing: "West" },
    { plotNumber: 66, length: 42, width: 36, status: "sold", facing: "West" },
    { plotNumber: 67, length: 42, width: 36, status: "sold", facing: "West" },
    { plotNumber: 68, length: 42, width: 36, status: "available", facing: "West" },
    { plotNumber: 22, length: 60, width: 36, status: "available", facing: "East" },

    // Zone G — between 9M road and 12M road (lower left)
    { plotNumber: 69, length: 42, width: 36, status: "available", facing: "West" },
    { plotNumber: 70, length: 42, width: 36, status: "available", facing: "West" },
    { plotNumber: 71, length: 42, width: 36, status: "available", facing: "West" },
    { plotNumber: 72, length: 42, width: 36, status: "available", facing: "West" },
    { plotNumber: 73, length: 42, width: 36, status: "available", facing: "West" },
    { plotNumber: 74, length: 42, width: 36, status: "sold", facing: "West" },
    { plotNumber: 75, length: 92.08, width: 42.08, status: "sold", facing: "West" },
    { plotNumber: 21, length: 60, width: 36, status: "available", facing: "East" },

    // Zone F — far lower-left
    { plotNumber: 76, length: 40.46, width: 61.67, status: "sold", facing: "East" },
    { plotNumber: 77, length: 42.21, width: 48.04, status: "sold", facing: "East" },
    { plotNumber: 78, length: 43.46, width: 48.04, status: "available", facing: "East" },
    { plotNumber: 79, length: 44.96, width: 48.04, status: "sold", facing: "East" },
    { plotNumber: 80, length: 46.625, width: 48.04, status: "available", facing: "East" },
    { plotNumber: 81, length: 48, width: 48.04, status: "available", facing: "East" },
    { plotNumber: 82, length: 49.375, width: 48.04, status: "available", facing: "East" },
    { plotNumber: 83, length: 50.79, width: 48.04, status: "available", facing: "East" },
    { plotNumber: 84, length: 52.17, width: 48.04, status: "available", facing: "East" },
    { plotNumber: 85, length: 53.54, width: 48.04, status: "sold", facing: "East" },
    { plotNumber: 86, length: 54.955, width: 48.04, status: "sold", facing: "East" },
    { plotNumber: 16, length: 78.6, width: 60, status: "sold", facing: "East" },
    { plotNumber: 20, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 19, length: 60, width: 36, status: "available", facing: "East" },
    { plotNumber: 18, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 17, length: 60, width: 36, status: "sold", facing: "East" },
    { plotNumber: 87, length: 56.83, width: 60.08, status: "sold", facing: "East" },
];

// Compute derived measurements
const plotData = rawPlots.map((p) => ({
    ...p,
    sqft: p.length * p.width,
    ankanams: +(p.length * p.width / 36).toFixed(2),
    sqYards: +(p.length * p.width / 9).toFixed(2),
}));

export default plotData;
