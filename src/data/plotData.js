/**
 * Plot data for the Quantamm Ventures residential layout.
 * Based on actual TUDA-approved layout diagram.
 * S.Nos: 59-5B & 75-4A, 4B of Mangalam (V), Tirupati (U) Mandal.
 *
 * Conversion Logic:
 *   1 Ankanam = 36 sq ft
 *   1 Cent    = 435.6 sq ft
 *
 * Status: "available" | "sold" | "reserved"
 */

const rawPlots = [
    // ── RIGHT COLUMN (East facing, along existing 80' road) ──────────
    // Upper right (above 12M road)
    { plotNumber: 1, length: 48, width: 30, status: "sold", facing: "East" },
    { plotNumber: 2, length: 43, width: 30, status: "available", facing: "East" },
    { plotNumber: 3, length: 43, width: 30, status: "available", facing: "East" },
    { plotNumber: 4, length: 43, width: 30, status: "sold", facing: "East" },
    // Lower right (below 12M road)
    { plotNumber: 5, length: 42, width: 30, status: "available", facing: "East" },
    { plotNumber: 6, length: 42, width: 30, status: "available", facing: "East" },
    { plotNumber: 7, length: 41, width: 30, status: "sold", facing: "East" },
    { plotNumber: 8, length: 41, width: 30, status: "available", facing: "East" },
    { plotNumber: 9, length: 41, width: 30, status: "reserved", facing: "East" },
    { plotNumber: 10, length: 41, width: 30, status: "available", facing: "East" },
    { plotNumber: 11, length: 40, width: 30, status: "sold", facing: "East" },
    { plotNumber: 12, length: 40, width: 30, status: "available", facing: "East" },

    // ── UPPER SECTION (above 12M road) ──────────────────────────────
    // Zone E — between 9M Layout Road and right column
    { plotNumber: 23, length: 36, width: 30, status: "available", facing: "South" },
    { plotNumber: 24, length: 36, width: 30, status: "sold", facing: "South" },
    { plotNumber: 25, length: 36, width: 30, status: "available", facing: "South" },
    { plotNumber: 26, length: 36, width: 30, status: "available", facing: "North" },
    { plotNumber: 27, length: 36, width: 30, status: "reserved", facing: "North" },
    { plotNumber: 28, length: 36, width: 30, status: "available", facing: "North" },
    { plotNumber: 29, length: 36, width: 30, status: "sold", facing: "South" },
    { plotNumber: 30, length: 36, width: 30, status: "available", facing: "South" },
    { plotNumber: 31, length: 36, width: 30, status: "available", facing: "South" },

    // Zone D — between 12M road and 9M Layout Road
    { plotNumber: 32, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 33, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 34, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 35, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 36, length: 30, width: 36, status: "reserved", facing: "East" },
    { plotNumber: 37, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 38, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 39, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 40, length: 30, width: 36, status: "available", facing: "West" },

    // Zone C — between 9M road and 12M road (upper left area)
    { plotNumber: 52, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 53, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 54, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 55, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 56, length: 30, width: 36, status: "reserved", facing: "East" },
    { plotNumber: 57, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 58, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 59, length: 30, width: 36, status: "available", facing: "West" },

    // Zone B — far upper-left (near open space)
    { plotNumber: 60, length: 42, width: 30, status: "available", facing: "West" },
    { plotNumber: 61, length: 42, width: 30, status: "sold", facing: "West" },
    { plotNumber: 62, length: 42, width: 30, status: "available", facing: "West" },

    // ── LOWER SECTION (below 12M road) ─────────────────────────────
    // Zone I — between 9M Layout Road and right column
    { plotNumber: 41, length: 36, width: 30, status: "sold", facing: "South" },
    { plotNumber: 42, length: 36, width: 30, status: "available", facing: "South" },
    { plotNumber: 43, length: 36, width: 30, status: "available", facing: "South" },
    { plotNumber: 44, length: 36, width: 30, status: "available", facing: "North" },
    { plotNumber: 45, length: 36, width: 30, status: "reserved", facing: "North" },
    { plotNumber: 46, length: 36, width: 30, status: "available", facing: "North" },
    { plotNumber: 47, length: 36, width: 30, status: "sold", facing: "South" },
    { plotNumber: 48, length: 36, width: 30, status: "available", facing: "South" },
    { plotNumber: 49, length: 36, width: 30, status: "available", facing: "South" },

    // Zone H — between 12M road and 9M Layout Road
    { plotNumber: 50, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 51, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 63, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 64, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 65, length: 30, width: 36, status: "reserved", facing: "East" },
    { plotNumber: 66, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 67, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 68, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 22, length: 30, width: 36, status: "available", facing: "West" },

    // Zone G — between 9M road and 12M road (lower left)
    { plotNumber: 69, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 70, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 71, length: 30, width: 36, status: "available", facing: "West" },
    { plotNumber: 72, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 73, length: 30, width: 36, status: "reserved", facing: "East" },
    { plotNumber: 74, length: 30, width: 36, status: "available", facing: "East" },
    { plotNumber: 75, length: 30, width: 36, status: "sold", facing: "West" },
    { plotNumber: 21, length: 30, width: 36, status: "available", facing: "West" },

    // Zone F — far lower-left
    { plotNumber: 76, length: 42, width: 30, status: "available", facing: "West" },
    { plotNumber: 77, length: 42, width: 30, status: "sold", facing: "West" },
    { plotNumber: 78, length: 42, width: 30, status: "available", facing: "West" },
    { plotNumber: 79, length: 44, width: 30, status: "available", facing: "West" },
    { plotNumber: 80, length: 42, width: 30, status: "reserved", facing: "West" },
    { plotNumber: 81, length: 42, width: 30, status: "sold", facing: "West" },
    { plotNumber: 82, length: 42, width: 30, status: "available", facing: "West" },
    { plotNumber: 83, length: 45, width: 30, status: "available", facing: "West" },
    { plotNumber: 84, length: 47, width: 30, status: "available", facing: "West" },
    { plotNumber: 85, length: 48, width: 30, status: "sold", facing: "West" },
    { plotNumber: 86, length: 45, width: 30, status: "available", facing: "West" },
];

// Compute derived measurements
const plotData = rawPlots.map((p) => ({
    ...p,
    sqft: p.length * p.width,
    ankanams: +(p.length * p.width / 36).toFixed(2),
    cents: +(p.length * p.width / 435.6).toFixed(2),
}));

export default plotData;
